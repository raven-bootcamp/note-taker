// create variables
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// find elements on the "notes" page if you are on that page
if (window.location.pathname === "/notes") {
	noteTitle = document.querySelector(".note-title");
	noteText = document.querySelector(".note-textarea");
	saveNoteBtn = document.querySelector(".save-note");
	newNoteBtn = document.querySelector(".new-note");
	noteList = document.querySelectorAll(".list-container .list-group");
}

// Show elements by changing the display type
const show = (element) => {
	element.style.display = "inline";
};

// Hide elements by changing display to none
const hide = (element) => {
	element.style.display = "none";
};

// setting a variable for the "active" note
let activeNote = {};

const getNotes = () =>
	fetch("/api/notes", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

// save a note by "posting" to the right endpoint
const saveNote = (note) =>
	fetch("/api/notes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			alert(`Error: ${response.statusText}`);
		}
	});

// delete a note using the note's ID
const deleteNote = (id) =>
	fetch(`/api/notes/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

// once a note is selected, show it in the main part of the page
const renderActiveNote = () => {
	hide(saveNoteBtn);

	// if active note exists, display note
	if (activeNote.id) {
    noteTitle.setAttribute("data-id", activeNote.id);
		noteTitle.value = activeNote.title;
		noteText.value = activeNote.text;
	}
	// else use placeholder text
	else {
    noteTitle.removeAttribute("data-id");
		noteTitle.value = "";
		noteText.value = "";
	}
};

// handle when a note is saved
const handleNoteSave = () => {
    let note;
    let noteId = noteTitle.getAttribute("data-id");
    
    if (noteId) { 
        note = {
            title: noteTitle.value,
            text: noteText.value,
            id: noteId
        };
    } else {
        note = {
            title: noteTitle.value,
            text: noteText.value
        };
    };

	saveNote(note).then(() => {
		getAndRenderNotes();
		renderActiveNote();
	});
};

// Delete a note when its button is clicked
const handleNoteDelete = (e) => {
	e.stopPropagation();

	const note = e.target;
	const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

	// reset active note once deleted
	if (activeNote.id === noteId) {
		activeNote = {};
	}

	deleteNote(noteId).then(() => {
		getAndRenderNotes();
		renderActiveNote();
	});
};

// handle when a note is clicked to be viewed
const handleNoteView = (e) => {
	e.preventDefault();
	activeNote = JSON.parse(e.target.getAttribute("data-note"));
	renderActiveNote();
};

// handle when a new note is being created and needs to be viewed
const handleNewNoteView = (e) => {
	activeNote = {};
	renderActiveNote();
};

// show and hide save button depending on situation
const handleRenderSaveBtn = () => {
	if (!noteTitle.value.trim() || !noteText.value.trim()) {
		hide(saveNoteBtn);
	} else {
		show(saveNoteBtn);
	}
};

// create list of valid notes
const renderNoteList = async (notes) => {
	let jsonNotes = await notes.json();
	if (window.location.pathname === "/notes") {
		noteList.forEach((el) => (el.innerHTML = ""));
	}

	let noteListItems = [];

	const createLi = (text, delBtn = true) => {
		const listEl = document.createElement("li");
		listEl.classList.add("list-group-item");
		listEl.addEventListener("click", handleNoteView);

		const spanEl = document.createElement("span");
		spanEl.innerText = text;

		listEl.append(spanEl);

		if (delBtn) {
			const delBtnEl = document.createElement("i");
			delBtnEl.classList.add(
				"fas",
				"fa-trash-alt",
				"float-right",
				"text-danger",
				"delete-note"
			);
			delBtnEl.addEventListener("click", handleNoteDelete);

			listEl.append(delBtnEl);
		}

		return listEl;
	};

	if (jsonNotes.length === 0) {
		noteListItems.push(createLi("No notes currently exist, create one!", false));
	}

	jsonNotes.forEach((note) => {
		const li = createLi(note.title);
		li.dataset.note = JSON.stringify(note);
		noteListItems.push(li);
	});

	if (window.location.pathname === "/notes") {
		noteListItems.forEach((note) => noteList[0].append(note));
	}
};

// Get valid notes and display them on the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
	saveNoteBtn.addEventListener("click", handleNoteSave);
	newNoteBtn.addEventListener("click", handleNewNoteView);
	noteTitle.addEventListener("keyup", handleRenderSaveBtn);
	noteText.addEventListener("keyup", handleRenderSaveBtn);
}

getAndRenderNotes();
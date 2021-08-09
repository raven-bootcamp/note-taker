# Note Taker
Take notes within your browser and save it to a local database.

Link to deployed application:

Link to code repository: https://github.com/raven-bootcamp/note-taker
## The Task

Our assignment is to modify starter code to create an application called Note Taker that can be used to write and save notes. This application uses an Express.js back-end and will save and retrieve note data from a JSON file.

The application’s front end has already been created. It's our job to build the back end, connect the two, and then deploy the entire application to Heroku.

## Instructions For Use
Assuming you have node.js working, and the repository has been cloned to your local machine:

1. While in the project directory, install the required library files with the command `npm install`
1. Check to see that a directory has been created called `node_modules`
1. Run the command `npm start` which starts the local server to use the application
1. Check to see what port is being used, shown in the message after starting the server
1. In your web browser, go to `localhost:3000` or whichever port is being used

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```


## Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```


## Mock-Up

The following images show the web application's appearance and functionality:

![Existing notes are listed in the left-hand column with empty fields on the right-hand side for the new note’s title and text.](./assets/11-express-homework-demo-01.png)

![Note titled “Balance accounts” reads, “Balance account books by end of day Monday,” with other notes listed on the left.](./assets/11-express-homework-demo-02.png)


## Screenshots of Solution

![image](assets/homepage.png)
![image](assets/populated-notes.png)

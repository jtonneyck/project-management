# Project Management

This is going to be a project management app build with express, mongodb and React. Users can create projects and tasks and assign the tasks to other users.

I'ts roughly based on the content on Moodle, but diverts from it on the following aspects:
* Scope. This project management app will have more functions, like the commenting on tasks and reassigning tasks to other users and tasks statuses.
* No passport authentication. This App uses express-session and mongo-store.
* Styled with bulma.
* Uploading of profile pictures (not implemented yet)

# How to Run

Execute npm install in both the client and API directories. Configure the config.json files in both the Client and Api (/API/config/config.json, /Client/src/config.json). Make sure you've created a new database for this project. To start, open up 2 terminals for both directories and run npm start. Access the client route you've specified in the /Api/config/config.json file.
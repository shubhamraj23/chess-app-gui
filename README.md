# MERN Stack Chess Web Application

## Introduction
This repository contains a full stack web application to implement a chess game. The tech stack used includes Node.js, Express.js, MongoDB, React.js, Redux and TailwindCSS. This repository documentation contains the following:
- [Repository Structure](#repository-structure)
- [Setup to run the Application locally](#setup-to-run-the-application-locally)

## Repository Structure
The repository contains the following files and folders.
- **backend:** This folder contains the source code for the backend of the application. The sub-folders in this folder are:
  - **src:** It contains the main logic for building the backend.
    - **middleware:** It contains the middleware logic for validation of games and users.
    - **models:** It contains the schema of the mongoose models.
    - **routers:** It contains the backend routes handling the different routes.
    - **app.js:** The logic for connecting the express application with different middleware.
    - **config.js:** Configuration file for different environments.
    - **index.js** This is the entry point to the Node.js application. It creates the Express application and sets it up to listen on a specific port.
    - **mongoose.js:** This file sets up the connection to the MongoDB database. The MongoDB URL is saved as an environment variable named MONGO_URL. This URL can be either a MongoDB instance on a local server / virtual machine or a Cloud Solution like MongoDB Atlas.
  - **tests:** It contains the test cases for testing the backend routes.
- **frontend:** This folder contains the source code for the frontend of the application. The sub-folders in this folder are:
  - **public:** It contains the contains the base HTML file.
  - **src:** It contains the main logic for building the frontend.
    - **components:** It contains the logic of all the components present in the application.
    - **images:** It contains all the images associated with the application.
    - **redux:** It contains the files related to Redux state management library.
    - **tests:** It contains the test cases for testing the frontend components.

## Setup to run the Application locally
### Prerequisites
- The system must have NodeJS installed.
- To test if the application is running properly, you must have Postman and MongoDB Compass (or any other tool that can connect to the MongoDB instance and show the documents).
- The URL of a running MongoDB instance on any server.

### Steps
- Clone the repository using the command ```git clone https://github.com/shubhamraj23/chess-app-gui.git```.
- Inside the repository, install all the dependencies using ```npm install```.
- Inside the frontend folder, install all the frontend dependencies using ```cd frontend && npm install```.
- Change directory to the backend folder ```cd backend```
- Create a folder named config, create a file named .env.dev inside it and add the following environment variables.
  ```
  NODE_ENV=dev
  MONGOURL=insert_the_url_of_your_mongodb_instance_here.
  JWT_SECRET=insert_your_secret
  SECURE_COOKIE=false
  BASE_URL=http://localhost:8080/
  ```
  Make sure that you correctly insert the URL of your MongoDB instance and your own JWT Secret.
- Move to the root folder and run the application using the command ```npm run dev```
- You can now view the application on your browser on http://localhost:3000/
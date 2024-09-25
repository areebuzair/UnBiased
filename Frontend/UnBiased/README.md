# To run the Front-end of our app:

### Configure Firebase
First, Firebase needs to be initialized. 
Open a Firebase app and initialize a firestore database. Create a new collection called `Forum-posts` and ensure that it has read/write permissions set to true in the rules section.
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
The posts in the Database should have the following structure:
```
author: {
  id: "",
  name: ""
},
postText: "",
title: ""
```
Also enable Google Authentication on the Authenticate section.

Create a .env file in the `.../Frontend/Backend` folder, and fill it up with the Firebase configuration data for a firebase website.
```.env
VITE_apiKey = ---
VITE_authDomain = ---
VITE_projectId = ---
VITE_storageBucket = ---
VITE_messagingSenderId = ---
VITE_appId = ---
```

### Download dependencies
Open a terminal in the `.../Frontend/UnBiased` folder and run:
```bash
npm i
```

### Run the Website
In the terminal, write:
```bash
npm run dev
```

# Note
The website makes all API calls to http://localhost:8017.

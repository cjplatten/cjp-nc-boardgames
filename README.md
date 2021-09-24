# Board Games API

## Summary

This is an SQL database API which stores reviews of board games linked to categories and allows users to post comments related to specified reviews and vote on reviews.
<br></br>
Find the hosted version here:
https://nc-boardgames-cjp.herokuapp.com/api

---

## Instructions

### 1 - Clone repo

1. In the terminal, enter the directory you wish to clone the repo to by running the following:

```bash
cd <directory_path>
```

2. On the github page fork the repo and, once forked, click the green Code button and copy the link.

3. In the directory run the following to create a new directory containing the repo:

```bash
git clone <github_clone_link>
```

4. Once cloning is complete you wil now be able to access the repo on your local machine from the new directory created.

---

### 2 - Install dependencies

1. Enter the repo directory on your local machine by running the following in the terminal.

```bash
cd <repo_directory_path>
```

2. Run the following command in the terminal:

```bash
npm install
```

- This will install the following dependencies as specified in `package.json`

```json
 "dependencies": {
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "pg": "^8.7.1",
    "pg-format": "^1.0.4"
  },
  "devDependencies": {
    "jest": "^27.2.1",
    "jest-sorted": "^1.0.12",
    "nodemon": "^2.0.13",
    "supertest": "^6.1.6"
  }
```

---

### 3 - Seed local database

1. Run the following commands **in order** in the terminal while still in the repo directory:

```bash
npm run setup-dbs
npm run seed
```

- This will create the development and test databases and will seed the development database with data by running the following commands as set in the `package.json`:

```JSON
"scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js",
    //[...]
}
```

---

### 4 - Create .env

1. Create two new files in the repo directory named `.env.test` and `.env.development`.

2. Add the following text to the body of the created files:

- To `.env.test` add:

```
PGDATABASE=nc_games_test
```

- To `.env.development` add:

```
PGDATABASE=nc_games
```

3. These files are now in place to connect to the appropriate database for the NODE environment.

---

### 5 - Run tests

There are two different methods of testing the functionality of this API, in a test enviroment using Jest and in the development environment using nodemon to listen to incoming server requests.

The NODE_ENV will need changing depending on the type of testing which is acheived using the scripts below as set in package.json. This process is outlined below.

```JSON
"scripts": {
//[...]
"test": "NODE_ENV=test jest",
"dev": "nodemon listen.js",
//[...]
}
```

#### **Test ENV - Jest**

1. Run the following command in the terminal:

```bash
npm test
```

2. This will run the tests found in the `__tests__` folder of the repo and will indicate the pass/fail of test in the terminal.  
   <br>

#### **Development ENV - nodemon**

Development testing requires the use of an API client such as insomnia to test POST and PATCH endpoints but a browser client can also be used to test GET endpoints.

1. Run the following command in the terminal:

```bash
npm run dev
```

2. The app will then begin listening the localhost port 9090 by default
3. Test the endpoints detailed in https://nc-boardgames-cjp.herokuapp.com/api (or `endpoints.json`) as required
4. Once testing is completed press `ctrl + c` in the terminal to close the port and stop the app listening.

---

## Minimum Requirements

- Node v16.5.0
- psql (PostgreSQL) 12.8

Version information can be found by running the following commands in the terminal:

```bash
node --version

psql --version
```

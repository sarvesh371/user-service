# user-service
> Typescript RESTful backend application template for User Authentication Session Management.

👉 **STAR ⭐ this project for later use and to keep posted on the changes.**

## Table of Contents
- Auth Backend
    - [Table of Contents](#table-of-contents)
    - [General Information](#general-information)
    - [Features](#features)
    - [API's](#api)
    - [Technologies and Techniques](#technologies-and-techniques)
        - [Project configuration](#project-configuration)
        - [Main application](#main-application)
  - [Setup](#setup)
  - [Project Status](#project-status)

## General Information
- This project was created to fullfil the need several Software Engineers have when trying to create a Fullstack Web project from scratch.
- It provides the source code backend template to authenticate and authorize users by exposing RESTful APIs.
- It will help you to setup signup, login, logout and authenticate flow for your applications.

## Features
- userName, fullName, email and password signup ✔
- userName and password login ✔
- logout ✔
- session expiration ✔
- Authorization 🔜
- Forgot password 🔜
- Change password 🔜
- User password expiration 🔜
- Account verification via SMS 🔜
- Authentication with Google 🔜

## API
1. Homepage api for server homepage
```
curl --location 'http://localhost:8080/v1'
```
2. Signup api to signup new users
```
curl --location 'http://localhost:8080/v1/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "",
    "fullName": "Firstname Lastname",
    "email": "email@gmail.com",
    "password": "admin"

}'
```
3. Login api to login existing users
```
curl --location 'http://localhost:8080/v1/login' \
--header 'Content-Type: application/json' \
--data '{
    "userName": "username",
    "password": "admin"

}'
```
4. Logout api to logout logged in users
```
curl --location 'https://user-service-ptwk.onrender.com/v1/logout'
```
5. User api to check if user session is expired or not, this can be used before every functionality api of any application
```
curl --location 'https://user-service-ptwk.onrender.com/v1/user'
```


## Technologies and Techniques

### Project configuration
- The configuration variables are stored in a ```.env``` file. This file is managed by a configurator module to facilitate its usage across the other application modules by using the [dotenv](https://github.com/motdotla/dotenv) library.

<div style="margin-left: 3rem;" >

```
📦src
 ┣ 📂vi  => Main source code container.
 ┃ ┣ 📂config  => Export .env file . 
 ┃ ┣ 📂controllers  => Orchestrators that use Services and Middlewares to provide a response.
 ┃ ┣ 📂docker  => Docker compose file to spawn up postgres on docker.
 ┃ ┣ 📂middlewares  => Functions to be executed before the Router's main controllers.
 ┃ ┣ 📂routes  => Routes of the application.
 ┃ ┗ 📂utils  => Functions used multiple times across the folders in the project.
 ┗ 📜index.ts  => Main file that starts the main application.
``` 
</div>

### Main application
- This project was implenmented 100% with Typescript, Nodejs and Express.
- Authentication is implemented with the [bcryptjs](https://github.com/kelektiv/node.bcrypt.js) library for password encryption and the Local stategy from the [Passport](https://www.passportjs.org/) library.
- Tokenization is done with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
- ```PostgresDB``` was used for the databse.

## Setup
1. Clone this project by doing:
```
$ git clone https://github.com/sarvesh371/user-service.git
```
2. Go to the folder you've just cloned the code and execute:
```
$ npm install
```
3. Start a PostgresDb on local using docker-compose.yml
```
$ cd docker
$ docker-compose up -d
```
4. Connect to Postgres and create user table which will be used for service
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
5. Create a unique secret key only known by your server
```
$ node
$ import crypto
$ crypto.randomBytes(20).toString(‘hex’)
```
6. Create a ```.env``` file in your project's container folder. The file should have the following variables with your own values:
```
HOST=localhost
USER=admin
DATABASE=user
PASSWORD=admin
SECRET_ACCESS_TOKEN={GENERATED FROM STEP 5}
SESSION_EXPIRATION=60
SERVER_PORT=8080
SSL=false
```
7. Run the server using below command from root folder
```
$ npm run dev
```
8. For debugging the serve use below launch.json config
```
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "skipFiles": ["<node_internals>/**"],
        "program": "/Users/sarvesh/Documents/Github/user-service/v1/index.ts",  // Update with your entry file path
        "runtimeExecutable": "npm",
        "runtimeArgs": ["run", "dev"],
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen"
      }
    ]
  }
```


## Project Status
Project is: _in progress_

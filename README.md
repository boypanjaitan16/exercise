# Getting Started with this project

This project contains multiple stack on multiple services

## Front-end

react.js next.js tailwindcss

## Back-end

express.js, mongodb

## DevOps

Docker, docker-compose

# How to start

Make sure you have Docker and docker-compose installed on your machine,\ 
and also make sure your `docker-compose` support for v`3.8`

## Build services

before building it, make sure you have configured `.env` variables avaiable such as
```
NODE_PORT=8000
REACT_PORT=5000
NEXT_PORT=3000
MONGO_PORT=27018
MONGO_USERNAME=root
MONGO_PASSWORD=dbpassword
MONGO_DB=admin
MONGO_HOST=db

APP_NAME="Exercise Tracker"
ACCESS_TOKEN_SECRET=xxxxx
```
then run `docker-compose up --build` to build

## Up and Down

after you finished with your work yuo can turn down all the services using `docker-compose down`\
and next time just use `docker-compose up` to re-run all services

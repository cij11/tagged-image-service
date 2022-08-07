# Tagged Image Service

Service for uploading images, applying tags to images, searching images by tags and upload date, and downloading images.

## Requirements

1. NodeJS
1. Docker (if deploying MSQL inside docker)
1. A database client
1. Mac OS, Linux, or WSL environment on Windows machine.

## Database installation

This project connects to a MYSQL database. The project could be connected to an existing MYSQL database. Alternately, follow the below instructions to setup a dockerised mysql instance

Run the following commands to deploy the dockerised MYSQL

`sudo docker pull mysql/mysql-server:latest`
`sudo docker run --name=chris_jolly_tagged_image_service_exercise -d mysql/mysql-server:latest`

A mysql database will now be running inside a docker container. Connect to this databse with any docker client with
host:localhost
port:3306
username:root
password:<leave this blank>

## User and Database setup

-- We need to set a root database user password to use the database
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password123';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';
FLUSH PRIVILEGES;

-- Run these as root to set up user and db
CREATE USER 'tagged_image_service'@'localhost' IDENTIFIED BY 'password123';
CREATE DATABASE tagged_image_service_db;
GRANT ALL PRIVILEGES ON tagged_image_service_db.\* TO 'tagged_image_service'@'localhost';

ALTER USER 'tagged_image_service'@'localhost' IDENTIFIED BY 'password123';

## Configure App Data Source

If you have deployed a dockerised MYSQL instance, then the database credentials in app-data-source.ts will already be configured.
If you are using an existing MYSQL instance, set host, port, username, and password in app-data-source.ts

## Run Database Migrations

To run the database migrations to create tables, run
`npm i`
`npm run migrate`

## Launch Application

Launch the application by running
`npm run serve`

## Testing Application

Run unit tests by running
`npm run test`

Test endpoints by using a REST client such as Insomnia: https://insomnia.rest/

An insomnia collection is included in this repo as tagged-image-service-insomnia-collection.json . This can be imported into insomnia to make calls against the running API immediately.

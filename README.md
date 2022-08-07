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

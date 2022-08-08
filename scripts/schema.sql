-- Run these as root to set up user and db
CREATE USER 'tagged_image_service'@'%' IDENTIFIED BY 'password123';
CREATE DATABASE tagged_image_service_db;
GRANT ALL PRIVILEGES ON tagged_image_service_db.* TO 'tagged_image_service'@'%';


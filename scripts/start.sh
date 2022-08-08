#!/bin/bash

cd .. &
docker build . -t chrisjolly25/tagged-image-service &
docker compose up -d
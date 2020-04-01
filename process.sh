#!/bin/bash
echo "Closing any existing docker instances..."
docker-compose down
echo "Closed"
echo "Updating data..."
./source-data/mung.py
if [ $? -eq 0 ]
then
    echo "Updated. running docker-compose up --build..."
    docker-compose up --build
    exit 1
else
    echo "Failed to mung..."
    exit 1
fi

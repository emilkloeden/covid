#!/bin/bash
./source-data/mung.py
if [ $? -eq 0 ]
then
    docker-compose up --build
    exit 1
else
    echo "Failed to mung..."
    exit 1
fi
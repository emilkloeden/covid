#!/bin/bash
echo "Changing into application directory"
cd /root/covid/
echo "Closing any existing docker instances..."
docker-compose down
echo "Closed"
echo "Updating data..."
./source-data/mung.py --update
if [ $? -eq 0 ]
then
    echo "Updated. running docker-compose up --build..."
    docker-compose up --build -d
    echo "Process ran at: $(date)" >> /var/log/process.log
    exit 1
else
    echo "Failed to mung..."
    echo "FAILED at $(date)" >> /var/log/process.log
    exit 1
fi

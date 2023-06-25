#!/bin/bash

# Change to the server directory
cd /home/ubuntu/CodeCord/server

# Start the server using the script defined in package.json
pm2 start npm --name "server" -- run "prod"

# Change to the client dist directory
cd  ../client/dist

# Start the client using npm serve with pm2
pm2 start http-server --name "client" -- -p 5173
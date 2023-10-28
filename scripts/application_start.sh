# Change to the server directory
cd /home/ubuntu/CodeCord/server

# Start the server using the script defined in package.json
pm2 start npm --name "server" -- run "prod"

# Change to the client dist directory
cd  ../client

# Start the client using http-server with pm2
pm2 start npm --name "client" -- run "serve"
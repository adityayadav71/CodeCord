# Change to the server directory
cd /home/ubuntu/CodeCord/server

# Start the server using the script defined in package.json
pm2 start npm --name "server" -- run "prod"

# Change to the client dist directory
cd  ../client/dist

# Start the client using http-server with pm2
pm2 start "http-server dist -b -g -p 5173 --proxy http://localhost:5173/index.html" --name "client"
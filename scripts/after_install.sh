#!/bin/bash
cd /home/ubuntu/CodeCord/server
npm install
npm audit fix --force

cd ../client
npm install
npm audit fix --force
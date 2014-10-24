#!/bin/bash
cd
cd WebServer
forever stopall
git pull origin master
forever start server.js
echo "Server Restarted"

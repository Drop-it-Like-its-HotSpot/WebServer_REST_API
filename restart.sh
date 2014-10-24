#!/bin/bash
sudo su
cd
cd WebServer
forever stopall
forever start server.js
echo "Server Restarted"
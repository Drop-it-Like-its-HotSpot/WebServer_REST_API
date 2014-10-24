#!/bin/bash
cd
cd WebServer
forever stopall
forever start server.js
echo "Server Restarted"

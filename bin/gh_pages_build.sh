#!/bin/bash
rm -rf ./dist
node_modules/.bin/parcel build src/index.html
rm ./*.js
cp ./dist/*.js .
echo "CHANGE JS SRC PATH! also, automate this..."

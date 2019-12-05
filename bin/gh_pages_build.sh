#!/bin/bash
rm -rf ./dist
node_modules/.bin/parcel build src/index.html
cp ./dist/* .

#!/bin/bash

npm install
npm install -g n

n lts

# start app
# npm build
# npm run ng build
npm run watch &
npm run start
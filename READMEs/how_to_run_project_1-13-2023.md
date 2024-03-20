# TLDR

Documenting the steps of running the Airdrop bot as of 1-13-2023

## Prerequisites

- A MongoDB db server running
    - verify one is running ie: `docker ps`
    - if db not running ie: `docker run -d -p 27017:27017 --name=airdrop-bot-ledger mongo:latest`

## STEPS

1. `temporal server start-dev`
1. Open the temporal UI in a browser: `http://localhost:8233`
1. Open MongoDB Compass application
1. In another shell, `npm run start.watch` to start the Worker
1. In another shell, `npm run server` to run the Express server that exposes a number of useful endpoints
1. Now you can use the bot ie: start a flow, create a flow etc. using the Express endpoints
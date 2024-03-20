# TLDR

This is the "The Airdrop Bot". This project securely generates blockchain accounts and simulates humanlike transactions with them over long periods of time to bring the accounts into a state where they can qualify for token rewards on various EVM-based chains.

## Prerequisites

You'll need a Temporal server, a MongoDB database, and Node.js.

1. Install Temporal - `https://learn.temporal.io/getting_started/typescript/dev_environment/`
    - `https://github.com/temporalio/cli/#installation`
2. Run a MongoDB database and download MongoDB Compass
    - `https://www.mongodb.com/`
    - if using Docker try `docker run -d -p 27017:27017 --name=dropbot-db mongo:latest`
    - https://www.mongodb.com/products/tools/compass
3. Install Node.js - `https://nodejs.org/`
4. `npm install`

## Running this project

1. `temporal server start-dev`
1. Open the Temporal Web UI on `http://localhost:8233`
1. Open Mongo DB Compass
1. In another shell, `npm run start.watch` to start a Worker for running `flows`
1. In another shell, `npm run server` to run the Express server (that exposes a number of useful endpoints a few of which are listed below)
    - app.post('/createFlow', createFlow); // Generate a list (aka a `flow`) of supported actions
    - app.post('/startFlow', startFlow); // Reference a `flow` by id and schedule it with Temporal
    - etc.

## How to think about this project

This project is sort of like 3 projects in one code base...

1. `src/server` - holds an Express server that allows controlling flows via an HTTP API
2. `src/temporal` - holds a Temporal project for scheduling & running action sequences against one of more blockchains

## Useful resources

- https://learn.temporal.io/getting_started/typescript/hello_world_in_typescript/
- https://docs.ethers.org/v6/
- https://www.quicknode.com/guides/ethereum-development/wallets/how-to-generate-a-new-ethereum-address-in-javascript

## Useful information

- "@ethersproject/wallet": "^5.7.0" and "ethers": "^5.7.2" must align on MAJOR and MINOR numbers
# TLDR

The 'Airdrop Bot' has gone through many design iterations and this a snapshot of the steps for getting the bot up-and-running as of 1-6-2024

## High level overview

1. Run the Temporal server (Step 1)
2. Run the Temporal UI (Steps 2-8)

## Steps

1. temporal server start-dev <!-- Start a temporal server -->
2. git clone org-56493103@github.com:temporalio/ui.git <!-- Clone the temporal UI -->
3. cd ui
4. curl -fsSL https://get.pnpm.io/install.sh | sh - <!-- Install pnpm -->
5. pnpm i
6. pnpm build:local
7. pnpm run preview:local
8. http://localhost:3000/ <!-- Visit the temporal UI -->
9. Test running a workflow
    - npm run start.watch <!-- Run a worker ie: a queue -->
    - docker run --name airdropbot -p 27017:27017 -d mongo:latest  <!-- Spin up a MongoDB cluster for storing the state of each bot -->
    - npm run watch
    - npm run workflow
10. Run the Express server endpoints
    - npm run server

## cURL commands for testing the server endpoints

curl -X POST http://localhost:3000/addAirdrop
curl -X POST http://localhost:3000/addMasterKey
curl -X POST http://localhost:3000/addWallet

## Testing /addFlow endpoint

curl -H "Content-Type: application/json" -X POST http://localhost:3000/createFlow -d '{"actionSequenceId":"polygonmumbai_actionSequence1","walletId":"659aead9c24c396c8a8a4000"}'

## Testing /startFlow endpoint

curl -H "Content-Type: application/json" -X POST http://localhost:3000/startFlow -d '{"flowId": "659b2facc25c8a327ab21ae7"}'

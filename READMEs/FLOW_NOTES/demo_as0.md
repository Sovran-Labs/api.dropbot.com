
# TLDR

This runs through the steps of how to run a flow

1. Select an account ie: a PubKey/PrivKey pair. Utilities for generating a pair are listed here:
    - `npm utils:genHdAccounts` - will generate an HD wallet ie: a seed phrase along with a number of derived accounts
    - `npm utils:derivePrivateKeyFromMnemonic` - will derive the private key of an HD generated public key
    - TIP: Import seedphrase into MetaMask for debugging
1. Generate a `flow` using the `/createFlow` Express endpoint
    - INPUT #1 is the id of a supported flow
        - supported flows are listed in `src/config/ActionSequences`
    - INPUT #2 is the initial global state that will be tracked when the flow is executed
    - INPUT #3 is a human readable description that describes the flow (ie: what/why/when it was created)
    - TIP: Read initial account balances using relevant blockchain explorers
    - TIP: You may need to send funds to the chosen account depending on the chosen Action Sequence
    - ie: `curl -H "Content-Type: application/json" -X POST http://localhost:3000/createFlow -d '{"actionSequenceId":"1","globalState":{"account":"","balances":{"POLYGON_MUMBAI":{"MATIC":"1957486226976832869"}}},"description":"Tad testing 11:28pm EST"}'`
    - View the created flow in MongoDB and add the PrivKey for the account that the bot will use into global state using the key `pk`
    - Retrieve the id of the flow from MongoDB ie: `65a369d94f7cf3d1958dc32d`
1. Run the flow using the `/startFlow` Express endpoint
    - ie: `curl -H "Content-Type: application/json" -X POST http://localhost:3000/startFlow -d '{"flowId": "65a369d94f7cf3d1958dc32d"}'`'
1. View the flow in the Temporal Web UI: http://localhost:8233/
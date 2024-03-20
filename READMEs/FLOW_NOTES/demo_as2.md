
# THINGS TO DEMO FOR JAM

## DEMO #2

- cmd + shift + v to enter markdown viewer (can only view 1 .md at a time)

### Generate an HD Wallet
```
npm run utils:genHdAccounts
```
## Select an account in the generated HD wallet and fund with initial capital
- Import seedphrase into MetaMask to see that generated accounts are compatible
- Test sending initial capital on Polygon Mumbai
- TODO: Write a script that accumulates an investor list in MongoDB
## Generate a flow ie: an action sequence beginning on Polygon Mumbai
- CUSTOMIZE the description, account
```
curl -H "Content-Type: application/json" -X POST http://localhost:3000/createFlow -d '{"actionSequenceId":"actionSequence1","globalState":{"account":"","balances":{"POLYGON_MUMBAI":{"MATIC":"1957610579978542745"}}},"description":"Demo for Jam at 10:39am EST"}'
```
## Show the flow recorded into MongoDB
- Open up MongoDB Compass
## Open up the Temporal UI
- Have `http://localhost:8233/` visible before triggering the flow
## Populate bot with private key
- `npm run utils:derivePrivateKeyFromMnemonic`
## Start the flow
- Retrieve flowId from MongoDB and start flow with following cURL
```
curl -H "Content-Type: application/json" -X POST http://localhost:3000/startFlow -d '{"flowId": "659c23e897e846e8fc2206d2"}'
```
## Showing the UI in Temporal UI
- http://localhost:8233
- Show the sequence of actions timeline widget and also showcase the ability to analyze individual actions
## Showing state in MongoDB
- Show that the flow has been recorded as having been started in MongoDB Compass

# STRETCH

- SHOWOFF cross-referencing with Polyscan Address
- SHOWOFF extensibility of design
- Mock out / Scaffold out a 30 to 40 step action sequence
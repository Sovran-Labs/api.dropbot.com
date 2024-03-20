# DEMO AS1

## Generate a flow ie: an action sequence

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/createFlow -d '{"actionSequenceId":"1","globalState":{"account":"0x83d51D9C19f3765c2C86d763ceCD2B871E2666cF","blockchains":["POLYGON_MUMBAI"]},"description":"testing as1 at 10:23am EST"}'
```

## Open up the Temporal UI

- Have `http://localhost:8233/` visible before triggering the flow

## Start the flow

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65b7080702eca600f15b5633"}'
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

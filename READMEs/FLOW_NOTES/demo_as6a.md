## DEMO asHoudiniTest

## Generate a flow ie: an action sequence beginning on Polygon

- CUSTOMIZE the description, account

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/createFlow -d '{"actionSequenceId":"6a","globalState":{"account":"","obfuscatedAccount":"","blockchains":["POLYGON", "ARBITRUM"]},"description":"testing Houdini 6a"}'
```

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65c086ec3656265130a297f0"}'
```


https://debank.com/profile/
https://debank.com/profile/
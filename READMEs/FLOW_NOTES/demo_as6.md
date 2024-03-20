## DEMO asHoudiniTest

## Generate a flow ie: an action sequence beginning on Polygon

- CUSTOMIZE the description, account

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/createFlow -d '{"actionSequenceId":"6","globalState":{"account":"","obfuscatedAccount":"","blockchains":["POLYGON", "ARBITRUM"]},"description":"testing Houdini 6 MATIC -> ETHARB"}'
```

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65c108bebf34e3fea1e5e4f6"}'
```

https://debank.com/profile/ (Obfuscation)
https://debank.com/profile/ (Account)


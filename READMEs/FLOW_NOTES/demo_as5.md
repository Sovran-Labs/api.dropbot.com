## DEMO #4

- cmd + shift + v to enter markdown viewer (can only view 1 .md at a time)

## Generate a flow ie: an action sequence beginning on Polygon Mumbai
- CUSTOMIZE the description, account
```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/createFlow -d '{"actionSequenceId":"5a","globalState":{"account":"","blockchains":["POLYGON", "ZKSYNC"]},"description":"testing as5a"}'
```

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65b7509fd3b4afc11a0f20b9"}'
```

## Orbiter Bridge has minAmt and maxAmt restriction

`https://eth-converter.com/`


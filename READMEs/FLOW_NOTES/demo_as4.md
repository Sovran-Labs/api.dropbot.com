## DEMO #4

## Generate a flow ie: an action sequence beginning on Polygon Mumbai

- CUSTOMIZE the description, account

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/createFlow -d '{"actionSequenceId":"4","globalState":{"account":"","blockchains":["POLYGON_MUMBAI"]},"description":"testing as4"}'
```

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65b6b4c0964ed7726570867a"}'
```
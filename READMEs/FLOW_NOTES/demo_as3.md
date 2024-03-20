## DEMO #3

- cmd + shift + v to enter markdown viewer (can only view 1 .md at a time)

## Generate a flow ie: an action sequence beginning on Polygon Mumbai
- CUSTOMIZE the description, account
```
curl -H "Content-Type: application/json" -X POST http://localhost:3000/createFlow -d '{"actionSequenceId":"3","globalState":{"account":"","blockchains":["POLYGON_MUMBAI"]},"description":"testing as3"}'
```

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65b5aab76c99a4913e5c463e"}'
```
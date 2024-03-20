# TLDR

This README.md contains useful info about obfuscation in relation to "The Airdrop Bot".

## HoudiniSwap

- https://api.xblock.tech/
- https://xblock.gitbook.io/product-docs/api-developer-guide

## Potential HoudiniSwap alternatives

- https://www.paradigm.xyz/2023/05/blend
- https://www.blendprotocol.io/

## Implementing HoudiniSwap PoC

The HoudiniSwap is powered by mainly 4 endpoints documented here: https://xblock.gitbook.io/xblock/api-developer-guide#status-guide.

In a nutshell...

1. /token - Confirm source token / destination token is supported
1. /quote - Get a quote
1. /exchange - Get the address you need to send the source tokens to
1. Send the tokens
1. /status - Check the transaction status until it is succesfully completed and fail if things are taking longer than the ETA

### /tokens

curl --location 'https://api-partner.houdiniswap.com/tokens' \
--header 'Authorization: $PARTNER_ID:$API_KEY'

### /quote

curl --location --request GET 'https://api-partner.houdiniswap.com/quote' \
--header 'Authorization: 658af113a715a9fdb3f3a810:2VkeAbeQGiUsMCNMVziLuE' \
--header 'Content-Type: application/json' \
--data '{
    "amount": "40",
    "from": "MATIC",
    "to": "ETHARB",
    "anonymous": true
}'

### /exchange

curl --location 'https://api-partner.houdiniswap.com/exchange' \
--header 'Authorization: 658af113a715a9fdb3f3a810:2VkeAbeQGiUsMCNMVziLuE' \
--header 'Content-Type: application/json' \
--data '{
    "amount": "40",
    "from": "MATIC",
    "to": "ETHARB",
    "receiverTag": "",
    "addressTo": "",
    "anonymous": true,
    "ip": "0.0.0.0",
    "userAgent": ""
}'

### SEND THEM TOKENS!!!

Via ethers.js or MetaMask

### /status

curl --location --request GET 'https://api-partner.houdiniswap.com/status' \
--header 'Authorization: $PARTNER_ID:$API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "id": "4idoevPSczUVp2A4X6skz4"
}'
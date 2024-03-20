# TLDR

Info related to bridging powered by Orbiter.finance

## Relevant links

- https://docs.orbiter.finance/overview
- https://openapi2.orbiter.finance/sdk/routers/cross-chain
- https://openapi2.orbiter.finance/sdk/chains

## High level steps for how to bridge value between chains

1. Fetch the relevant cross chain router contract for the desired src/target chain/token
    - can be fetched from `GET https://openapi2.orbiter.finance/sdk/routers/cross-chain`
1. Confirm you have enough funds to bridge
    - the cross chain router has min/max amounts that can be bridged at a time
1. Construct a txn that accounts for the Orbiter fees etc.
1. Include the id of the target chain in the amount field of the txn
    - ie: `const final_amount = payAmount.toString().slice(0, -4) + crossChainRouter['vc'];`
1. Send funds to cross chain router
1. Verify the txn on both chains by viewing txn history for the sender account and the crossChainRouter address
1. Raise a arbitration with Orbiter if funds aren't received within a few minutes (TODO - test arbitration process)
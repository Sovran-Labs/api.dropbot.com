# Modeling an Airdrop Bot's 'Flow'

- `flow` - a sequence of phases
    - `phase` - a sequence of actions performed on a sequence of blockchains
        - `blockchainSequence` ie: [ "polygon-mumbai", "bsc-testnet" ] or [ "ethereum", "bsc", "polygon" ]
        - `scheduledActionSequence` ie: the upcoming actions that are scheduled in the flow leading into the next checkpoint
        - `actionSequenceLog` ie: keep the history of completed actions here

# What the options of actionSequences looks like...

```.json
[
  {
    "blockchain": "polygon-mumbai",
    "options": [
      {
        "actions": [ "preCheck", "wrap native in", "wrap native out", "postCheck" ]
        "name": "actionSequence1"
      },
      {
        "actions": [
          "preCheck",
          "wrap native in",
          "validateLiquidityPair",
          "uniswapV2 swap in",
          "validateLiquidityPair",
          "uniswapV2 swap out",
          "wrapped native out",
          "postCheck",
        ],
        "name": "actionSequence2"
      }
    ],
    "tags": ["legacy"]
  }
]
```

# Principles

- "When building a flow, each account will hold one coin when arriving on a blockchain's ledger."
- Validate bot state after performing each action (with higher priority on the first and last action in an action sequence ie: pre/post checks)
- Schedule action sequences on a per chain basis to not schedule actions before they are guaranteed to be valid
- Each `actionSequence` assumes arriving on a chain with one account holding the L1 token and ends in a state ready to bridge to another blockchain
- If `postCheck` fails, then raise an alert for manual review
- If `postCheck` succeeds, then bridge to subsequent chain
- If `blockchainSequence` finishes then proceed to next phase

# TLDR

Tad's tips for Steve when creating Flow #7a that incorporates SyncSwap on zkSync testnet...

## STEP 1 - Create a file for the template of the flow...

- create it in `src/config/ActionSequences/as7a.ts`
- break up the overall flow for testing into the following files...
  - building block 1 in `src/config/ActionSequences/as7a.ts`
  - etc.
- add Flow #7a to the "Flow Menu" - ie: `src/config/ActionSequences/index.ts`

## STEP 2 - If helpful add typings for the Action Sequence Template

- The types for the ActionSequence templates are located here...
  - `src/ts/interfaces/actionSequenceTemplates`
  - Create any types that are useful for you related to Flow #7a in...
    - `src/ts/interfaces/actionSequenceTemplates/FLOW_7a`
- The names for each action in Flow #7a will be specified here...
  - `src/config/As7aActions.ts`

## STEP 3 Add the actions to the temporal/workflows.ts file

- Add support for the activities/actions you have created for Flow 7 in...
  - `src/temporal/workflow.ts`
- This will entail adding an `if/else` branch that contains a check for all the `actions` related to Flow #7a
- Inside the `if/else` branch you can put a `switch` clause to trigger the relevant temporal activites

## STEP 4 - Verify everything is working

- Pause to confirm steps 1 to 3 are set up properly
- ie: put a simple console.log before actually calling the activities

## STEP 5 - Add the activities for each actions

- Add the functions that correspond to each action here: `src/temporal/activities/flow7a/index.ts`
- Import each activity/function into the `src/temporal/workflow.ts` files
  - following the pattern from lines 16-61 in `src/temporal/workflow.ts`

## STEP 6 - Build a simple flow demonstrating SyncSwap integraion

- https://syncswap.gitbook.io/syncswap/
- Work with Kyle to familiarize with protocol
- PRO TIP: Jump straight into implementation and avoid reading unnecessary documentation

## STEP 7 - Running SyncSwap flow 7a

```
curl -H "Content-Type: application/json" -X POST http://localhost:4000/startFlow -d '{"flowId": "65c9a1732bcbd5cbe49beead"}'
```

```
https://goerli.explorer.zksync.io/tx/0x2310eed51fcb45c45364b33ad379ca7f4a090b47fa176d09bc6223eb7747000f
trx hash: 0x2310eed51fcb45c45364b33ad379ca7f4a090b47fa176d09bc6223eb7747000f
```

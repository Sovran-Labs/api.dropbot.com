import { v4 as uuid } from 'uuid';
import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7dActions } from '@/src/config/As7dActions';
import { GeneralActions } from '@/src/config/GeneralActions';
import { IPreSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7D/presequenceCheck';
import { IPreSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7D/presyncswapSwapCheck';
import { ISyncswapSwap7dTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7D/syncswapSwap';
import { IAwaitBlocksTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7D/awaitBlocks';
import { IPostSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7D/postsyncswapSwapCheck';
import { IPostSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7D/postsequenceCheck';

// pass in account dynamically, tokens dynamically, get it working on mainnet, add another dynamic parameter where we pass one more ***

export default function buildActionSequenceFromTemplate7d() {
  const actionUuids = new Array(2).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: As7dActions.AS7d_SYNC_BALANCES_WITH_BLOCKCHAIN,
      inputs: {
        wAccount: {
          type: InputValueTypes.STATE,
          key: 'inputs.wAccount',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
      name: As7dActions.AS7d_SYNCSWAP_SWAP,
      inputs: {
        wAccount: {
          type: InputValueTypes.STATE,
          key: 'inputs.wAccount',
        },
        tokenA: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenA',
        },
        tokenB: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenB',
        },
        tokenAAddress: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenAAddress',
        },
        tokenBAddress: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenBAddress',
        },
        tokenALowerBound: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenALowerBound',
        },
        tokenAUpperBound: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenAUpperBound',
        },
        waitTimeLowerBound: {
          type: InputValueTypes.STATE,
          key: 'inputs.waitTimeLowerBound',
        },
        waitTimeUpperBound: {
          type: InputValueTypes.STATE,
          key: 'inputs.waitTimeUpperBound',
        },
        loopCount: {
          type: InputValueTypes.STATE,
          key: 'inputs.loopCount',
        },
      },
    } as ISyncswapSwap7dTemplate,
  ];

  return {
    actions,
    id: '7d',
    description: 'SyncSwap swap on ZkSync Mainnet',
  };
}

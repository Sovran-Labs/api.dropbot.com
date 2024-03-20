import { v4 as uuid } from 'uuid';
import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7cActions } from '@/src/config/As7cActions';
import { GeneralActions } from '@/src/config/GeneralActions';
import { IPreSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7C/presequenceCheck';
import { IPreSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7C/presyncswapSwapCheck';
import { ISyncswapSwap7cTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7C/syncswapSwap';
import { IAwaitBlocksTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7C/awaitBlocks';
import { IPostSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7C/postsyncswapSwapCheck';
import { IPostSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7C/postsequenceCheck';

// pass in account dynamically, tokens dynamically, get it working on mainnet, add another dynamic parameter where we pass one more ***

export default function buildActionSequenceFromTemplate7c() {
  const actionUuids = new Array(2).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: As7cActions.AS7c_SYNC_BALANCES_WITH_BLOCKCHAIN,
      inputs: {
        wAccount: {
          type: InputValueTypes.STATE,
          key: 'inputs.wAccount',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
      name: As7cActions.AS7c_SYNCSWAP_SWAP,
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
        tokenAAmount: {
          type: InputValueTypes.STATE,
          key: 'inputs.tokenAAmount',
        },
      },
    } as ISyncswapSwap7cTemplate,
  ];

  return {
    actions,
    id: '7c',
    description: 'SyncSwap swap on ZkSync Goerli Testnet',
  };
}

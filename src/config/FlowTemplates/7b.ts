import { v4 as uuid } from 'uuid';
import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7bActions } from '@/src/config/As7bActions';
import { GeneralActions } from '@/src/config/GeneralActions';
import { IPreSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/presequenceCheck';
import { IPreSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/presyncswapSwapCheck';
import { ISyncswapSwapTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/syncswapSwap';
import { IPostSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/postsyncswapSwapCheck';
import { IPostSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/postsequenceCheck';

export default function buildActionSequenceFromTemplate7b() {
  const actionUuids = new Array(14).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: GeneralActions.SYNC_BALANCES_WITH_BLOCKCHAIN,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchains: {
          type: InputValueTypes.STATE,
          key: 'global.blockchains',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
      name: As7bActions.AS7b_PRE_SEQUENCE_CHECK,
      dependencies: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.ZKSYNC,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        balances: {
          type: InputValueTypes.STATE,
          key: 'global.balances',
        },
      },
    },
    {
      actionUuid: actionUuids[2],
      name: As7bActions.AS7b_SYNCSWAP_SWAP,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.ZKSYNC,
        },
        wethAddress: {
          type: InputValueTypes.CONFIG,
          key: 'ZKSYNC.wethAddress',
        },
        percentOfTokenABalance: {
          type: InputValueTypes.RANGE,
          lowerBound: 5,
          upperBound: 10,
        },
        tokenA: {
          type: InputValueTypes.HARDCODED,
          val: {
            chainId: ChainIds.ZKSYNC,
            address: '0x000000000000000000000000000000000000800A',
            decimals: 18,
            symbol: 'ETH',
            name: 'Ethereum',
          },
        },
        tokenB: {
          type: InputValueTypes.HARDCODED,
          val: {
            chainId: ChainIds.ZKSYNC,
            address: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
            decimals: 6,
            symbol: 'USDC',
            name: 'USDC',
          },
        },
      },
    },
  ];

  return {
    actions,
    id: '7b',
    description: 'SyncSwap swaps on ZkSync',
  };
}

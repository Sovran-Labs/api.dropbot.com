import { v4 as uuid } from 'uuid';
import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7aActions } from '@/src/config/As7aActions';
import { GeneralActions } from '@/src/config/GeneralActions';
import { IPreSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/presequenceCheck';
import { IPreSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/presyncswapSwapCheck';
import { ISyncswapSwapTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/syncswapSwap';
import { IPostSyncswapSwapCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/postsyncswapSwapCheck';
import { IPostSequenceCheckTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/FLOW_7/postsequenceCheck';

export default function buildActionSequenceFromTemplate7a() {
  const actionUuids = new Array(4).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: As7aActions.AS7a_SYNC_BALANCES_WITH_BLOCKCHAIN,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
      name: As7aActions.AS7a_PRE_SEQUENCE_CHECK,
      dependencies: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.ZKSYNC_SEPOLIA_TESTNET,
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
    } as IPreSequenceCheckTemplate,
    {
      actionUuid: actionUuids[2],
      name: As7aActions.AS7a_PRE_SYNCSWAP_SWAP_CHECK,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
      },
    } as IPreSyncswapSwapCheckTemplate,
    {
      actionUuid: actionUuids[3],
      name: As7aActions.AS7a_SYNCSWAP_SWAP,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.ZKSYNC_SEPOLIA_TESTNET,
        },
        wethAddress: {
          type: InputValueTypes.CONFIG,
          key: 'ZKSYNC_SEPOLIA_TESTNET.wethAddress',
        },
        percentOfTokenABalance: {
          type: InputValueTypes.RANGE,
          lowerBound: 5,
          upperBound: 10,
        },
        tokenA: {
          type: InputValueTypes.HARDCODED,
          // SOURCE: https://polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270#code
          // SOURCE: WMATIC on Polygon is https://docs.uniswap.org/contracts/v3/reference/deployments
          val: {
            chainId: ChainIds.ZKSYNC_SEPOLIA_TESTNET,
            address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
            decimals: 18,
            symbol: 'WMATIC',
            name: 'Wrapped Matic',
          },
        },
        // SOURCE: https://polygonscan.com/token/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
        tokenB: {
          type: InputValueTypes.HARDCODED,
          val: {
            chainId: ChainIds.ZKSYNC_SEPOLIA_TESTNET,
            address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
        },
      },
    } as ISyncswapSwapTemplate,
  ];

  return {
    actions,
    id: '7a',
    description: 'SyncSwap swaps on ZkSync Sepolia Testnet',
  };
}

import { v4 as uuid } from 'uuid';
import { Blockchains, ChainIds } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { PolygonActions } from '../PolygonActions';
import { GeneralActions } from '../GeneralActions';
// import { IOrbiterBridgeTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/GENERAL/orbiterBridge';
import { IPolygonOrbiterBridgeTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/POLYGON/orbiterBridge';
import { ZkSyncActions } from '../zkSyncActions';

export default function buildActionSequenceFromTemplate5a() {
  const actionUuids = new Array(6).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: PolygonActions.PRE_SEQUENCE_CHECK,
      dependencies: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON,
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
    // WRAP MATIC for WMATIC
    {
      actionUuid: actionUuids[1],
      name: PolygonActions.UNISWAP_V3_SWAP,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON,
        },
        percentOfTokenABalance: {
          type: InputValueTypes.RANGE,
          lowerBound: 60,
          upperBound: 70,
        },
        tokenA: {
          type: InputValueTypes.HARDCODED,
          // SOURCE: https://polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270#code
          // SOURCE: WMATIC on Polygon is https://docs.uniswap.org/contracts/v3/reference/deployments
          val: {
            chainId: ChainIds.POLYGON,
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
            chainId: ChainIds.POLYGON,
            address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
        },
      },
    },
    {
      actionUuid: actionUuids[2],
      name: GeneralActions.WAIT,
      dependencies: {
        duration: {
          type: InputValueTypes.HARDCODED,
          val: '3m',
        },
      },
    },
    {
      actionUuid: actionUuids[3],
      name: PolygonActions.POLYGON_ORBITER_BRIDGE,
      // name: GeneralActions.ORBITER_BRIDGE,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON,
        },
        // SOURCE: https://api.orbiter.finance/sdk/routers/cross-chain
        orbiterEnv: {
          type: InputValueTypes.HARDCODED,
          val: 'MAINNET',
        },
        sourceChain: {
          type: InputValueTypes.HARDCODED,
          val: {
            id: ChainIds.POLYGON,
            name: Blockchains.POLYGON,
          },
        },
        sourceTokenAddress: {
          type: InputValueTypes.HARDCODED,
          val: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        },
        targetChain: {
          type: InputValueTypes.HARDCODED,
          val: {
            id: ChainIds.ZKSYNC,
            name: Blockchains.ZKSYNC,
          },
        },
        targetTokenAddress: {
          type: InputValueTypes.HARDCODED,
          val: '0x0000000000000000000000000000000000000000',
        },
        percentageToBridge: {
          type: InputValueTypes.RANGE,
          lowerBound: 80,
          upperBound: 90,
        },
      },
    } as IPolygonOrbiterBridgeTemplate,
    {
      actionUuid: actionUuids[4],
      name: GeneralActions.WAIT,
      dependencies: {
        duration: {
          type: InputValueTypes.HARDCODED,
          val: '3m',
        },
      },
    },
    {
      actionUuid: actionUuids[5],
      name: ZkSyncActions.ZKSYNC_ORBITER_BRIDGE,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.ZKSYNC,
        },
        // SOURCE: https://api.orbiter.finance/sdk/routers/cross-chain
        orbiterEnv: {
          type: InputValueTypes.HARDCODED,
          val: 'MAINNET',
        },
        sourceChain: {
          type: InputValueTypes.HARDCODED,
          val: {
            id: ChainIds.ZKSYNC,
            name: Blockchains.ZKSYNC,
          },
        },
        sourceTokenAddress: {
          type: InputValueTypes.HARDCODED,
          val: '0x0000000000000000000000000000000000000000',
        },
        targetChain: {
          type: InputValueTypes.HARDCODED,
          val: {
            id: ChainIds.POLYGON,
            name: Blockchains.POLYGON,
          },
        },
        targetTokenAddress: {
          type: InputValueTypes.HARDCODED,
          val: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        },
        percentageToBridge: {
          type: InputValueTypes.RANGE,
          lowerBound: 100,
          upperBound: 100,
        },
      },
    },
  ];

  return {
    actions,
    id: '5a',
    description:
      'The first mainnet action sequence ie: Swap WMATIC on Polygon for WETH via UniswapV3 -> then -> bridge Polygon WETH to zkSync ETH through Orbiter -> then -> bridge the zkSync ETH back to Polygon WETH through Orbiter',
  };
}

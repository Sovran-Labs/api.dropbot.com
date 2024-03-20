import { v4 as uuid } from 'uuid';
import { Blockchains } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';
import { IWrapWethInTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/POLYGON_MUMBAI/wrapWethIn';

import { IPreCheck1Template } from '@/src/ts/interfaces/actions/actionSequenceTemplates/POLYGON_MUMBAI/preCheck1';
import { IPostWrapWethInTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/POLYGON_MUMBAI/postWrapWethIn';
import { IUniswapV3SwapTemplate } from '@/src/ts/interfaces/actions/actionSequenceTemplates/POLYGON_MUMBAI/uniswapV3Swap';

export default function buildActionSequenceFromTemplate4() {
  const actionUuids = new Array(3).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: PolygonMumbaiActions.PRE_SEQUENCE_CHECK,
      dependencies: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
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
    } as IPreCheck1Template,
    {
      actionUuid: actionUuids[1],
      name: PolygonMumbaiActions.UNISWAP_V3_SWAP,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        wethAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wethAddress',
        },
        percentOfBalance: {
          type: InputValueTypes.RANGE,
          lowerBound: 5,
          upperBound: 10,
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
      },
    } as IUniswapV3SwapTemplate,
    // {
    //   actionUuid: actionUuids[2],
    //   name: PolygonMumbaiActions.POST_WRAP_WETH_IN_CHECK,
    //   dependencies: {
    //     account: {
    //       type: InputValueTypes.STATE,
    //       key: 'global.account',
    //     },
    //     blockchain: {
    //       type: InputValueTypes.HARDCODED,
    //       val: Blockchains.POLYGON_MUMBAI,
    //     },
    //     txnHash: {
    //       type: InputValueTypes.STATE,
    //       key: `actionLog.${actionUuids[1]}.metadata.txnHash`,
    //     },
    //     preBalance: {
    //       type: InputValueTypes.STATE,
    //       key: `actionLog.${actionUuids[1]}.metadata.preBalance`,
    //     },
    //     preWETHBalance: {
    //       type: InputValueTypes.STATE,
    //       key: `actionLog.${actionUuids[1]}.metadata.preWETHBalance`,
    //     },
    //     amountWrapped: {
    //       type: InputValueTypes.STATE,
    //       key: `actionLog.${actionUuids[1]}.metadata.amountWrapped`,
    //     },
    //   },
    // } as IPostWrapWethInTemplate,
  ];

  return {
    actions,
    id: '4',
    description: 'An action sequence for testing wrapping L1 tokens into WETH on Polygon Mumbai.',
  };
}

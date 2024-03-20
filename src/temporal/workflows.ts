import { Status, IAction } from '../ts/interfaces';
import { Blockchains } from '../config/Blockchains';

import { ZkSyncActions } from '../config/zkSyncActions';
import { PolygonMumbaiActions } from '../config/PolygonMumbaiActions';
import { SepoliaActions } from '../config/SepoliaActions';
import { GeneralActions } from '../config/GeneralActions';

import * as activities from '../temporal/activities';
import * as workflow from '@temporalio/workflow';
import { errorHandler } from '../temporal/utils/errorHandler';
import { PolygonActions } from '../config/PolygonActions';
import { HoudiniActions } from '../config/HoudiniActions';
import { OrbiterActions } from '../config/OrbiterActions';
import { Flow1Actions } from '../config/Flow1Actions';
import { As6Actions } from '../config/As6Actions';
import { As7aActions } from '../config/As7aActions';
import { As7bActions } from '../config/As7bActions';
import { As7cActions } from '../config/As7cActions';
import { As7dActions } from '../config/As7dActions';

export const {
  // ZKSYNC
  ZKSYNC_orbiterBridge,
  // POLYGON
  POLYGON_awaitBlocks,
  POLYGON_preCheck,
  POLYGON_postCheck,
  POLYGON_uniswapV3Swap,
  POLYGON_wrapNativeIn,
  POLYGON_postWrapNativeInCheck,
  POLYGON_wrapNativeOut,
  POLYGON_postWrapNativeOutCheck,
  POLYGON_preUniswapV3SwapCheck,
  POLYGON_postUniswapV3SwapCheck,
  POLYGON_orbiterBridge,
  // POLYGON_MUMBAI
  POLYGON_MUMBAI_preCheck,
  POLYGON_MUMBAI_postCheck,
  POLYGON_MUMBAI_wrapIn,
  POLYGON_MUMBAI_postWrapInCheck,
  POLYGON_MUMBAI_wrapOut,
  POLYGON_MUMBAI_postWrapOutCheck,
  POLYGON_MUMBAI_preBridgeCheck,
  POLYGON_MUMBAI_awaitBlocks,
  //
  POLYGON_MUMBAI_wrapWethIn,
  POLYGON_MUMBAI_postWrapWethInCheck,
  //
  POLYGON_MUMBAI_uniswapV3Swap,
  // POLYGON_MUMBAI_preUniswapV2Check,
  // POLYGON_MUMBAI_uniswapV2Swap,
  // GENERAL
  GENERAL_orbiterBridge,
  GENERAL_buildDependencies,
  GENERAL_syncBalancesWithBlockchain,
  // SEPOLIA
  SEPOLIA_preCheck,
  // HOUDINI
  HOUDINI_getExchangeAddress,
  HOUDINI_getQuote,
  HOUDINI_getSupportedTokens,
  HOUDINI_sendStatus,
  HOUDINI_sendTokens,
  // ACTION_SEQUENCES
  AS6_preCheck,
  // FLOW 7a
  FLOW7a_syncBalancesWithBlockchain,
  FLOW7a_presequenceCheck,
  FLOW7a_preswapCheck,
  FLOW7a_syncswapSwap,
  FLOW7a_postswapCheck,
  FLOW7a_postsequenceCheck,
  // FLOW 7b
  FLOW7b_syncBalancesWithBlockchain,
  FLOW7b_presequenceCheck,
  FLOW7b_preswapCheck,
  FLOW7b_syncswapSwap,
  FLOW7b_postswapCheck,
  FLOW7b_postsequenceCheck,
  // FLOW 7c
  FLOW7c_syncBalancesWithBlockchain,
  FLOW7c_awaitBlocks,
  FLOW7c_presequenceCheck,
  FLOW7c_preswapCheck,
  FLOW7c_syncswapSwap,
  FLOW7c_postswapCheck,
  FLOW7c_postsequenceCheck,
  // FLOW 7d
  FLOW7d_syncBalancesWithBlockchain,
  FLOW7d_awaitBlocks,
  FLOW7d_presequenceCheck,
  FLOW7d_preswapCheck,
  FLOW7d_syncswapSwap,
  FLOW7d_postswapCheck,
  FLOW7d_postsequenceCheck,
  // FLOW 1
  FLOW_1_awaitBlocks,
  FLOW_1_email,
  FLOW_1_preCheck,
  FLOW_1_postCheck,
  FLOW_1_wrapIn,
  FLOW_1_postWrapInCheck,
  FLOW_1_wrapOut,
  FLOW_1_postWrapOutCheck,
  FLOW_1_preBridgeCheck,
  FLOW_1_wrapWethIn,
  FLOW_1_postWrapWethInCheck,
  // Orbiter
  ORBITER_bridgeTokens,
} = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: '30 minute',
  retry: {
    maximumAttempts: 1,
  },
  cancellationType: 0,
});

export async function routeWorkFlow(flowId: string, flow: IAction[]): Promise<{ status: Status } | undefined> {
  console.log();
  console.log('flowId: ', flowId);
  console.log('flow: ', flow);
  console.log();

  // record that the flow has been started

  try {
    for (const [index, action] of flow.entries()) {
      console.log('index', index, 'action', action);

      // if (action.name === HoudiniActions.HOUDINI_GET_QUOTE) {
      //   debugger;
      // }

      const dependencies = await GENERAL_buildDependencies(flowId, action.actionUuid, action.name, action.inputs);

      if (
        [
          As7dActions.AS7d_PRE_SEQUENCE_CHECK,
          As7dActions.AS7d_PRE_SYNCSWAP_SWAP_CHECK,
          As7dActions.AS7d_SYNCSWAP_SWAP,
          As7dActions.AS7d_POST_SYNCSWAP_SWAP_CHECK,
          As7dActions.AS7d_POST_SEQUENCE_CHECK,
          As7dActions.AS7d_SYNC_BALANCES_WITH_BLOCKCHAIN,
        ].includes(action.name as As7dActions)
      ) {
        switch (action.name) {
          case As7dActions.AS7d_PRE_SEQUENCE_CHECK:
            await FLOW7d_presequenceCheck(dependencies);
            break;
          case As7dActions.AS7d_PRE_SYNCSWAP_SWAP_CHECK:
            await FLOW7d_preswapCheck(dependencies);
            break;
          case As7dActions.AS7d_SYNCSWAP_SWAP:
            await FLOW7d_syncswapSwap(dependencies);
            break;
          case As7dActions.AS7d_POST_SYNCSWAP_SWAP_CHECK:
            await FLOW7d_postswapCheck(dependencies);
            break;
          case As7dActions.AS7d_POST_SEQUENCE_CHECK:
            await FLOW7d_postsequenceCheck(dependencies);
            break;
          case As7dActions.AS7d_SYNC_BALANCES_WITH_BLOCKCHAIN:
            await FLOW7d_syncBalancesWithBlockchain(dependencies);
            break;
          default:
            throw 'UNSUPPORTED AS7d ACTION';
        }
      } else if (
        [
          As7cActions.AS7c_PRE_SEQUENCE_CHECK,
          As7cActions.AS7c_PRE_SYNCSWAP_SWAP_CHECK,
          As7cActions.AS7c_SYNCSWAP_SWAP,
          As7cActions.AS7c_POST_SYNCSWAP_SWAP_CHECK,
          As7cActions.AS7c_POST_SEQUENCE_CHECK,
          As7cActions.AS7c_SYNC_BALANCES_WITH_BLOCKCHAIN,
        ].includes(action.name as As7cActions)
      ) {
        switch (action.name) {
          case As7cActions.AS7c_PRE_SEQUENCE_CHECK:
            await FLOW7c_presequenceCheck(dependencies);
            break;
          case As7cActions.AS7c_PRE_SYNCSWAP_SWAP_CHECK:
            await FLOW7c_preswapCheck(dependencies);
            break;
          case As7cActions.AS7c_SYNCSWAP_SWAP:
            await FLOW7c_syncswapSwap(dependencies);
            break;
          case As7cActions.AS7c_POST_SYNCSWAP_SWAP_CHECK:
            await FLOW7c_postswapCheck(dependencies);
            break;
          case As7cActions.AS7c_POST_SEQUENCE_CHECK:
            await FLOW7c_postsequenceCheck(dependencies);
            break;
          case As7cActions.AS7c_SYNC_BALANCES_WITH_BLOCKCHAIN:
            await FLOW7c_syncBalancesWithBlockchain(dependencies);
            break;
          default:
            throw 'UNSUPPORTED AS7c ACTION';
        }
      } else if (
        [
          As7bActions.AS7b_PRE_SEQUENCE_CHECK,
          As7bActions.AS7b_PRE_SYNCSWAP_SWAP_CHECK,
          As7bActions.AS7b_SYNCSWAP_SWAP,
          As7bActions.AS7b_POST_SYNCSWAP_SWAP_CHECK,
          As7bActions.AS7b_POST_SEQUENCE_CHECK,
          As7bActions.AS7b_SYNC_BALANCES_WITH_BLOCKCHAIN,
        ].includes(action.name as As7bActions)
      ) {
        switch (action.name) {
          case As7bActions.AS7b_PRE_SEQUENCE_CHECK:
            await FLOW7b_presequenceCheck(dependencies);
            break;
          case As7bActions.AS7b_PRE_SYNCSWAP_SWAP_CHECK:
            await FLOW7b_preswapCheck(dependencies);
            break;
          case As7bActions.AS7b_SYNCSWAP_SWAP:
            await FLOW7b_syncswapSwap(dependencies);
            break;
          case As7bActions.AS7b_POST_SYNCSWAP_SWAP_CHECK:
            await FLOW7b_postswapCheck(dependencies);
            break;
          case As7bActions.AS7b_POST_SEQUENCE_CHECK:
            await FLOW7b_postsequenceCheck(dependencies);
            break;
          case As7bActions.AS7b_SYNC_BALANCES_WITH_BLOCKCHAIN:
            await FLOW7b_syncBalancesWithBlockchain(dependencies);
            break;
          default:
            throw 'UNSUPPORTED AS7b ACTION';
        }
      } else if ([ZkSyncActions.ZKSYNC_ORBITER_BRIDGE].includes(action.name as ZkSyncActions)) {
        switch (action.name) {
          case ZkSyncActions.ZKSYNC_ORBITER_BRIDGE:
            await ZKSYNC_orbiterBridge(dependencies);
            break;
          default:
            throw 'UNSUPPORTED ZKSYNC ACTION';
        }
      } else if (
        [
          PolygonActions.PRE_SEQUENCE_CHECK,
          PolygonActions.AWAIT_BLOCKS,
          PolygonActions.POST_SEQUENCE_CHECK,
          PolygonActions.WRAP_NATIVE_IN,
          PolygonActions.WRAP_NATIVE_OUT,
          PolygonActions.POST_WRAP_NATIVE_IN_CHECK,
          PolygonActions.POST_WRAP_NATIVE_OUT_CHECK,
          PolygonActions.UNISWAP_V3_SWAP,
          PolygonActions.PRE_UNISWAP_V3_SWAP_CHECK,
          PolygonActions.POST_UNISWAP_V3_SWAP_CHECK,
          PolygonActions.POLYGON_ORBITER_BRIDGE,
        ].includes(action.name as PolygonActions)
      ) {
        switch (action.name) {
          case PolygonActions.PRE_SEQUENCE_CHECK:
            await POLYGON_preCheck(dependencies);
            break;
          case PolygonActions.AWAIT_BLOCKS:
            await POLYGON_awaitBlocks(dependencies);
            break;
          case PolygonActions.POST_SEQUENCE_CHECK:
            await POLYGON_postCheck(dependencies);
            break;
          case PolygonActions.WRAP_NATIVE_IN:
            await POLYGON_wrapNativeIn(dependencies);
            break;
          case PolygonActions.WRAP_NATIVE_OUT:
            await POLYGON_wrapNativeOut(dependencies);
            break;
          case PolygonActions.POST_WRAP_NATIVE_IN_CHECK:
            await POLYGON_postWrapNativeInCheck(dependencies);
            break;
          case PolygonActions.POST_WRAP_NATIVE_OUT_CHECK:
            await POLYGON_postWrapNativeOutCheck(dependencies);
            break;
          case PolygonActions.UNISWAP_V3_SWAP:
            await POLYGON_uniswapV3Swap(dependencies);
            break;
          case PolygonActions.PRE_UNISWAP_V3_SWAP_CHECK:
            await POLYGON_preUniswapV3SwapCheck(dependencies);
            break;
          case PolygonActions.POST_UNISWAP_V3_SWAP_CHECK:
            await POLYGON_postUniswapV3SwapCheck(dependencies);
            break;
          case PolygonActions.POLYGON_ORBITER_BRIDGE:
            await POLYGON_orbiterBridge(dependencies);
            break;
          default:
            throw 'UNSUPPORTED POLYGON ACTION';
        }
      } else if (
        [
          PolygonMumbaiActions.PRE_SEQUENCE_CHECK,
          PolygonMumbaiActions.WRAP_NATIVE_IN,
          PolygonMumbaiActions.POST_WRAP_NATIVE_IN_CHECK,
          PolygonMumbaiActions.WRAP_NATIVE_OUT,
          PolygonMumbaiActions.POST_WRAP_NATIVE_OUT_CHECK,
          PolygonMumbaiActions.WRAP_WETH_IN,
          PolygonMumbaiActions.POST_WRAP_WETH_IN_CHECK,
          PolygonMumbaiActions.UNISWAP_V3_SWAP,
          PolygonMumbaiActions.PRE_BRIDGE_CHECK,
          PolygonMumbaiActions.AWAIT_BLOCKS,
        ].includes(action.name as PolygonMumbaiActions)
      ) {
        switch (action.name) {
          case PolygonMumbaiActions.PRE_SEQUENCE_CHECK:
            await POLYGON_MUMBAI_preCheck(dependencies);
            break;
          case PolygonMumbaiActions.WRAP_NATIVE_IN:
            await POLYGON_MUMBAI_wrapIn(dependencies);
            break;
          case PolygonMumbaiActions.POST_WRAP_NATIVE_IN_CHECK:
            await POLYGON_MUMBAI_postWrapInCheck(dependencies);
            break;
          case PolygonMumbaiActions.WRAP_NATIVE_OUT:
            await POLYGON_MUMBAI_wrapOut(dependencies);
            break;
          case PolygonMumbaiActions.POST_WRAP_NATIVE_OUT_CHECK:
            await POLYGON_MUMBAI_postWrapOutCheck(dependencies);
            break;
          //
          case PolygonMumbaiActions.WRAP_WETH_IN:
            await POLYGON_MUMBAI_wrapWethIn(dependencies);
            break;
          case PolygonMumbaiActions.POST_WRAP_WETH_IN_CHECK:
            await POLYGON_MUMBAI_postWrapWethInCheck(dependencies);
            break;
          //
          case PolygonMumbaiActions.UNISWAP_V3_SWAP:
            await POLYGON_MUMBAI_uniswapV3Swap(dependencies);
            break;
          case PolygonMumbaiActions.POST_SEQUENCE_CHECK:
            await POLYGON_MUMBAI_postCheck(dependencies);
            break;
          case PolygonMumbaiActions.PRE_BRIDGE_CHECK:
            await POLYGON_MUMBAI_preBridgeCheck(dependencies);
            break;
          case PolygonMumbaiActions.AWAIT_BLOCKS:
            await POLYGON_MUMBAI_awaitBlocks(dependencies);
            break;
          default:
            throw 'UNSUPPORTED POLYGON MUMBAI ACTION';
        }
      } else if ([SepoliaActions.PRE_SEQUENCE_CHECK].includes(action.name as SepoliaActions)) {
        switch (action.name) {
          case SepoliaActions.PRE_SEQUENCE_CHECK:
            await SEPOLIA_preCheck(dependencies);
            break;
          default:
            throw 'UNSUPPORTED SEPOLIA ACTION';
        }
        // eslint-disable-next-line no-constant-condition
      } else if (false) {
        throw 'NO ETHEREUM ACTIONS AVAILABLE';
      } else if (
        [GeneralActions.ORBITER_BRIDGE, GeneralActions.WAIT, GeneralActions.SYNC_BALANCES_WITH_BLOCKCHAIN].includes(
          action.name as GeneralActions
        )
      ) {
        switch (action.name) {
          case GeneralActions.WAIT:
            await workflow.sleep(dependencies?.duration);
            break;
          case GeneralActions.ORBITER_BRIDGE:
            await GENERAL_orbiterBridge(dependencies);
            break;
          case GeneralActions.SYNC_BALANCES_WITH_BLOCKCHAIN:
            await GENERAL_syncBalancesWithBlockchain(dependencies);
            break;
          default:
            throw 'UNSUPPORTED GENERAL ACTION';
        }
      } else if (
        [
          HoudiniActions.HOUDINI_GET_SUPPORTED_TOKENS,
          HoudiniActions.HOUDINI_GET_QUOTE,
          HoudiniActions.HOUDINI_GET_EXCHANGE_ADDRESS,
          HoudiniActions.HOUDINI_SEND_TOKENS,
          HoudiniActions.HOUDINI_SEND_STATUS,
        ].includes(action.name as HoudiniActions)
      ) {
        switch (action.name) {
          case HoudiniActions.HOUDINI_GET_SUPPORTED_TOKENS:
            await HOUDINI_getSupportedTokens(dependencies);
            break;
          case HoudiniActions.HOUDINI_GET_QUOTE:
            await HOUDINI_getQuote(dependencies);
            break;
          case HoudiniActions.HOUDINI_GET_EXCHANGE_ADDRESS:
            await HOUDINI_getExchangeAddress(dependencies);
            break;
          case HoudiniActions.HOUDINI_SEND_TOKENS:
            await HOUDINI_sendTokens(dependencies);
            break;
          case HoudiniActions.HOUDINI_SEND_STATUS:
            await HOUDINI_sendStatus(dependencies);
            break;
          default:
            throw 'UNSUPPORTED HOUDINI ACTION';
        }
      } else if (
        [
          Flow1Actions.AWAIT_BLOCKS,
          Flow1Actions.EMAIL,
          Flow1Actions.PRE_SEQUENCE_CHECK,
          Flow1Actions.POST_SEQUENCE_CHECK,
          Flow1Actions.POST_WRAP_NATIVE_IN_CHECK,
          Flow1Actions.POST_WRAP_NATIVE_OUT_CHECK,
          Flow1Actions.WRAP_NATIVE_IN,
          Flow1Actions.WRAP_NATIVE_OUT,
        ].includes(action.name as Flow1Actions)
      ) {
        switch (action.name) {
          case Flow1Actions.AWAIT_BLOCKS:
            await FLOW_1_awaitBlocks(dependencies);
            break;
          case Flow1Actions.EMAIL:
            await FLOW_1_email(dependencies);
            break;
          case Flow1Actions.PRE_SEQUENCE_CHECK:
            await FLOW_1_preCheck(dependencies);
            break;
          case Flow1Actions.POST_SEQUENCE_CHECK:
            await FLOW_1_postCheck(dependencies);
            break;
          case Flow1Actions.WRAP_NATIVE_IN:
            await FLOW_1_wrapIn(dependencies);
            break;
          case Flow1Actions.POST_WRAP_NATIVE_IN_CHECK:
            await FLOW_1_postWrapInCheck(dependencies);
            break;
          case Flow1Actions.WRAP_NATIVE_OUT:
            await FLOW_1_wrapOut(dependencies);
            break;
          case Flow1Actions.POST_WRAP_NATIVE_OUT_CHECK:
            await FLOW_1_postWrapOutCheck(dependencies);
            break;
          default:
            throw 'UNSUPPORTED FLOW 1 ACTION';
        }
      } else if ([As6Actions.PRE_SEQUENCE_CHECK].includes(action.name as As6Actions)) {
        switch (action.name) {
          case As6Actions.PRE_SEQUENCE_CHECK:
            await AS6_preCheck(dependencies);
            break;
          default:
            throw 'UNSUPPORTED AS6 ACTION';
        }
      } else if (
        [
          As7aActions.AS7a_PRE_SEQUENCE_CHECK,
          As7aActions.AS7a_PRE_SYNCSWAP_SWAP_CHECK,
          As7aActions.AS7a_SYNCSWAP_SWAP,
          As7aActions.AS7a_POST_SYNCSWAP_SWAP_CHECK,
          As7aActions.AS7a_POST_SEQUENCE_CHECK,
          As7aActions.AS7a_SYNC_BALANCES_WITH_BLOCKCHAIN,
        ].includes(action.name as As7aActions)
      ) {
        switch (action.name) {
          case As7aActions.AS7a_PRE_SEQUENCE_CHECK:
            await FLOW7a_presequenceCheck(dependencies);
            break;
          case As7aActions.AS7a_PRE_SYNCSWAP_SWAP_CHECK:
            await FLOW7a_preswapCheck(dependencies);
            break;
          case As7aActions.AS7a_SYNCSWAP_SWAP:
            await FLOW7a_syncswapSwap(dependencies);
            break;
          case As7aActions.AS7a_POST_SYNCSWAP_SWAP_CHECK:
            await FLOW7a_postswapCheck(dependencies);
            break;
          case As7aActions.AS7a_POST_SEQUENCE_CHECK:
            await FLOW7a_postsequenceCheck(dependencies);
            break;
          case As7aActions.AS7a_SYNC_BALANCES_WITH_BLOCKCHAIN:
            await FLOW7a_syncBalancesWithBlockchain(dependencies);
            break;
          default:
            throw 'UNSUPPORTED AS7a ACTION';
        }
      }
      if ([OrbiterActions.BRIDGE_TOKENS].includes(action.name as OrbiterActions)) {
        switch (action.name) {
          case OrbiterActions.BRIDGE_TOKENS:
            await ORBITER_bridgeTokens(dependencies);
            break;
          default:
            throw 'UNSUPPORTED ORBITER ACTION';
        }
      } else {
        //
        throw 'UNSUPPORTED_ACTION';
        //
      }
    }

    const report: {
      status: Status;
    } = {
      status: Status.SUCCESS,
    };
    return report;
  } catch (e) {
    errorHandler(e);
  }
}

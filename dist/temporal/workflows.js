"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeWorkFlow = exports.GENERAL_buildDependencies = exports.GENERAL_orbiterBridge = exports.GENERAL_wait = exports.POLYGON_MUMBAI_awaitBlocks = exports.POLYGON_MUMBAI_wrapOut = exports.POLYGON_MUMBAI_postWrapInCheck = exports.POLYGON_MUMBAI_wrapIn = exports.POLYGON_MUMBAI_preCheck = void 0;
const interfaces_1 = require("../../src/ts/interfaces");
const Blockchains_1 = require("../config/Blockchains");
const PolygonMumbaiActions_1 = require("../config/PolygonMumbaiActions");
const GeneralActions_1 = require("../config/GeneralActions");
const activities = __importStar(require("./activities"));
const workflow = __importStar(require("@temporalio/workflow"));
const errorHandler_1 = require("./utils/errorHandler");
_a = workflow.proxyActivities({
    startToCloseTimeout: '10 minute',
    retry: {
        maximumAttempts: 1,
    },
    cancellationType: 0,
}), exports.POLYGON_MUMBAI_preCheck = _a.POLYGON_MUMBAI_preCheck, exports.POLYGON_MUMBAI_wrapIn = _a.POLYGON_MUMBAI_wrapIn, exports.POLYGON_MUMBAI_postWrapInCheck = _a.POLYGON_MUMBAI_postWrapInCheck, exports.POLYGON_MUMBAI_wrapOut = _a.POLYGON_MUMBAI_wrapOut, exports.POLYGON_MUMBAI_awaitBlocks = _a.POLYGON_MUMBAI_awaitBlocks, 
// POLYGON_MUMBAI_preUniswapV2Check,
// POLYGON_MUMBAI_uniswapV2Swap,
exports.GENERAL_wait = _a.GENERAL_wait, exports.GENERAL_orbiterBridge = _a.GENERAL_orbiterBridge, exports.GENERAL_buildDependencies = _a.GENERAL_buildDependencies;
async function routeWorkFlow(flowId, actionSequence) {
    console.log();
    console.log('flowId: ', flowId);
    console.log('actionSequence: ', actionSequence);
    console.log();
    // record that the flow has been started
    try {
        for (const [index, action] of actionSequence.entries()) {
            console.log('index', index, 'action', action);
            const dependencies = await (0, exports.GENERAL_buildDependencies)(flowId, action.dependencies);
            if (action.dependencies?.blockchain?.val === Blockchains_1.Blockchains.POLYGON_MUMBAI) {
                switch (action.name) {
                    case PolygonMumbaiActions_1.PolygonMumbaiActions.PRE_SEQUENCE_CHECK:
                        await (0, exports.POLYGON_MUMBAI_preCheck)(dependencies);
                        break;
                    case PolygonMumbaiActions_1.PolygonMumbaiActions.WRAP_NATIVE_IN:
                        await (0, exports.POLYGON_MUMBAI_wrapIn)(dependencies);
                        break;
                    case PolygonMumbaiActions_1.PolygonMumbaiActions.POST_WRAP_NATIVE_IN_CHECK:
                        await (0, exports.POLYGON_MUMBAI_postWrapInCheck)(dependencies);
                        break;
                    case PolygonMumbaiActions_1.PolygonMumbaiActions.WRAP_NATIVE_OUT:
                        await (0, exports.POLYGON_MUMBAI_wrapOut)(dependencies);
                        break;
                    // case PolygonMumbaiActions.PRE_UNISWAP_V2_CHECK:
                    //   await POLYGON_MUMBAI_preUniswapV2Check(dependencies);
                    //   break;
                    // case PolygonMumbaiActions.UNISWAP_V2_SWAP:
                    //   await POLYGON_MUMBAI_uniswapV2Swap(dependencies);
                    //   break;
                    // case PolygonMumbaiActions.PRE_BRIDGE_CHECK:
                    //   await activities.POLYGON_MUMBAI_preBridgeCheck(dependencies);
                    //   break;
                    case PolygonMumbaiActions_1.PolygonMumbaiActions.AWAIT_BLOCKS:
                        await activities.POLYGON_MUMBAI_awaitBlocks(dependencies);
                        break;
                    case GeneralActions_1.GeneralActions.WAIT:
                        await workflow.sleep(dependencies?.duration);
                        break;
                    default:
                        throw 'UNSUPPORTED POLYGON MUMBAI ACTION';
                }
            }
            else if (action.dependencies?.blockchain?.val === Blockchains_1.Blockchains.ETHEREUM) {
                throw 'NO ETHEREUM ACTIONS AVAILABLE';
            }
            else if ([GeneralActions_1.GeneralActions.ORBITER_BRIDGE, GeneralActions_1.GeneralActions.WAIT].includes(action.name)) {
                switch (action.name) {
                    case GeneralActions_1.GeneralActions.WAIT:
                        await workflow.sleep(dependencies?.duration);
                        break;
                    case GeneralActions_1.GeneralActions.ORBITER_BRIDGE:
                        await (0, exports.GENERAL_orbiterBridge)(dependencies);
                        break;
                    default:
                        throw 'UNSUPPORTED GENERAL ACTION';
                }
            }
            else {
                //
                throw 'UNSUPPORTED_BLOCKCHAIN';
                //
            }
        }
        const report = {
            status: interfaces_1.Status.SUCCESS,
        };
        return report;
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
    }
}
exports.routeWorkFlow = routeWorkFlow;
//# sourceMappingURL=workflows.js.map
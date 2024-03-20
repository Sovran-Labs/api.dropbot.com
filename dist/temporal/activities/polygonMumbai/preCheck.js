"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLYGON_MUMBAI_preCheck = void 0;
const assert_1 = __importDefault(require("assert"));
const infuraRpcProvider_1 = require("../../clients/infuraRpcProvider");
const flow_model_1 = __importDefault(require("@/src/models/flow/flow.model"));
const PolygonMumbaiActions_1 = require("@/src/config/PolygonMumbaiActions");
async function POLYGON_MUMBAI_preCheck(args) {
    console.log('___ --- ___');
    console.log('preCheck started...');
    const dbMaticBalance = args.balances['POLYGON_MUMBAI']['MATIC'];
    const { jsonRpcProvider } = await (0, infuraRpcProvider_1.connectInfuraJsonRpcProvider)();
    const blockNumber = await jsonRpcProvider?.getBlockNumber();
    const rpcMaticBalance = await jsonRpcProvider?.getBalance(args.account);
    const accountTxnCount = await jsonRpcProvider?.getTransactionCount(args.account);
    (0, assert_1.default)(rpcMaticBalance ? rpcMaticBalance.toBigInt() > BigInt('0') : false, 'no MATIC '); // Check that the account has funds
    (0, assert_1.default)(rpcMaticBalance?.toBigInt() === BigInt(dbMaticBalance), 'MATIC balance does not match expected balance'); // Check that initial balance tracked by the bot matches the blockchain
    console.log('--- updating MongoDB ---');
    await flow_model_1.default.updateOne({ _id: args.flowId }, {
        $push: {
            'state.actionLog': {
                name: PolygonMumbaiActions_1.PolygonMumbaiActions.PRE_SEQUENCE_CHECK,
                metadata: {
                    blockNumber,
                    rpcMaticBalance: rpcMaticBalance.toString(),
                    dbMaticBalance,
                    accountTxnCount,
                },
            },
        },
    });
    console.log('--- ___ ---');
    return {
        blockNumber,
        rpcMaticBalance: rpcMaticBalance.toString(),
        dbMaticBalance,
        accountTxnCount,
    };
}
exports.POLYGON_MUMBAI_preCheck = POLYGON_MUMBAI_preCheck;
//# sourceMappingURL=preCheck.js.map
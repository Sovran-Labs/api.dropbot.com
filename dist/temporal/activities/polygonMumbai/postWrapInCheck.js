"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLYGON_MUMBAI_postWrapInCheck = void 0;
const infuraRpcProvider_1 = require("../../clients/infuraRpcProvider");
const db_1 = require("../../clients/db");
const wallet_1 = require("@ethersproject/wallet");
const ethers_1 = require("ethers");
const flow_model_1 = __importDefault(require("../../../models/flow/flow.model"));
const weth9_1 = __importDefault(require("../../../abis/weth9"));
async function POLYGON_MUMBAI_postWrapInCheck(args) {
    console.log('___ --- ___');
    console.log('postWrapInCheck started...');
    await (0, db_1.connectDB)();
    const doc = await flow_model_1.default.findById(args.flowId);
    const { jsonRpcProvider } = await (0, infuraRpcProvider_1.connectInfuraJsonRpcProvider)();
    const signer = new wallet_1.Wallet(doc?.state?.global?.pk, jsonRpcProvider);
    const wmatic = new ethers_1.Contract(args.wrappedNativeTokenAddress, weth9_1.default, jsonRpcProvider.getSigner(args.account));
    const postWrapBalance = await jsonRpcProvider?.getBalance(signer.address);
    const postWMATICBalance = await wmatic.balanceOf(args.account);
    return {
        postMATICBalance: postWrapBalance.toString(),
        postWMATICBalance: postWMATICBalance.toString(),
        amount: args.amount,
    };
}
exports.POLYGON_MUMBAI_postWrapInCheck = POLYGON_MUMBAI_postWrapInCheck;
//# sourceMappingURL=postWrapInCheck.js.map
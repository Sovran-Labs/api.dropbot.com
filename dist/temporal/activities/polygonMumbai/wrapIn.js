"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLYGON_MUMBAI_wrapIn = void 0;
const status_1 = require("@/src/ts/interfaces/status");
const infuraRpcProvider_1 = require("../../clients/infuraRpcProvider");
const db_1 = require("../../clients/db");
const wallet_1 = require("@ethersproject/wallet");
const ethers_1 = require("ethers");
const flow_model_1 = __importDefault(require("../../../models/flow/flow.model"));
const assert_1 = __importDefault(require("assert"));
const weth9_1 = __importDefault(require("../../../abis/weth9"));
async function POLYGON_MUMBAI_wrapIn(args) {
    console.log('___ --- ___');
    console.log('wrapIn started...');
    await (0, db_1.connectDB)();
    const doc = await flow_model_1.default.findById(args.flowId);
    const { jsonRpcProvider } = await (0, infuraRpcProvider_1.connectInfuraJsonRpcProvider)();
    const feeData = await jsonRpcProvider?.getFeeData();
    if (feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        const signer = new wallet_1.Wallet(doc?.state?.global?.pk, jsonRpcProvider);
        const wmatic = new ethers_1.Contract(args.wrappedNativeTokenAddress, weth9_1.default, jsonRpcProvider.getSigner(args.account));
        const preBalance = await jsonRpcProvider?.getBalance(signer.address);
        const preWMATICBalance = await wmatic.balanceOf(args.account);
        const txn = await signer.sendTransaction({
            from: signer.address,
            to: args.wrappedNativeTokenAddress,
            value: ethers_1.utils.parseUnits(`${args.amount}`, 'wei'),
            maxFeePerGas: feeData?.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        });
        await txn.wait(10); // awaiting 10 confirmations
        // Get the transaction receipt using the hash
        const receipt = await jsonRpcProvider.getTransactionReceipt(txn.hash);
        // Get the transaction details to get the gas price
        const confirmedTxn = await jsonRpcProvider.getTransaction(txn.hash);
        let txnFee;
        if (confirmedTxn && confirmedTxn.gasPrice) {
            txnFee = receipt.gasUsed.mul(confirmedTxn.gasPrice);
        }
        else {
            throw 'UNABLE_TO_RETRIEVE_TXN_GAS_PRICE';
        }
        const postBalance = await jsonRpcProvider?.getBalance(signer.address);
        const postWMATICBalance = await wmatic.balanceOf(args.account);
        (0, assert_1.default)(preBalance.toBigInt() - txnFee.toBigInt() - BigInt(args.amount) === postBalance.toBigInt());
        (0, assert_1.default)(preBalance.toBigInt() - txnFee.toBigInt() - BigInt(args.amount) - postBalance.toBigInt() === BigInt(0));
        return {
            status: status_1.Status.SUCCESS,
            maxFeePerGas: feeData.maxFeePerGas.toString(),
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.toString(),
            preBalance: preBalance.toString(),
            preWMATICBalance: preWMATICBalance.toString(),
            transactionFee: txnFee.toString(),
            amount: args.amount,
            differenceInBalance: preBalance.sub(postBalance).toString(),
            differenceInWMATIC: postWMATICBalance.sub(preWMATICBalance).toString(),
            shouldBeZero: preBalance.sub(txnFee).sub(args.amount).sub(postBalance).toString(),
        };
    }
    else {
        throw 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER';
    }
}
exports.POLYGON_MUMBAI_wrapIn = POLYGON_MUMBAI_wrapIn;
//# sourceMappingURL=wrapIn.js.map
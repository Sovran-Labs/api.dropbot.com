"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approve_erc20 = exports.transfer = exports.evm_transfer = void 0;
const constant_1 = require("../../config/constant");
const transfer_1 = require("../utils/transfer");
const wallet_1 = require("@ethersproject/wallet");
const ethers_1 = require("ethers");
const units_1 = require("@ethersproject/units");
const constant_2 = require("../../config/constant");
const evm_transfer = async (txArgs) => {
    await (0, exports.transfer)(txArgs);
};
exports.evm_transfer = evm_transfer;
const transfer = async (txArgs) => {
    let tx, receipt;
    const { evmSigner, token, maker, amount } = txArgs;
    const signer = new wallet_1.Wallet(evmSigner.privateKey, token.provider);
    if ((0, transfer_1.is_native_token)(token.address)) {
        const params = { to: maker.makerAddress, value: amount };
        tx = await signer.sendTransaction(params);
        receipt = await tx.wait();
    } // it is an erc20
    else {
        const contract = new ethers_1.Contract(token.address, constant_2.ERC20_SOL_ABI, signer);
        tx = await contract.transfer(maker.makerAddress, amount);
        receipt = await tx.wait();
    }
    console.log('\nTransfer valided !');
    console.log('hash: ', tx.hash);
};
exports.transfer = transfer;
const approve_erc20 = async (target, token, amount, signer) => {
    const erc20 = new ethers_1.Contract(token.address, constant_2.ERC20_SOL_ABI, signer);
    console.log(`\nApproving ${target} to spend ${(0, units_1.formatUnits)(amount, token.precision)} ${constant_1.TICKER[token.address]}...`);
    // Approve amount + 10%
    const tx = await erc20.approve(target, (amount * BigInt(11)) / BigInt(10));
    const receipt = await tx.wait();
    console.log('\nTransaction valided !');
    console.log('hash: ', tx.hash);
};
exports.approve_erc20 = approve_erc20;
//# sourceMappingURL=evm_transfer.js.map
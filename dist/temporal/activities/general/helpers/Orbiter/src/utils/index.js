"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.not_enough_balance = exports.log_routes = exports.resolve_provider = exports.get_balance = void 0;
const chains_1 = __importDefault(require("../../config/chains"));
const transfer_1 = require("./transfer");
const ethers_1 = require("ethers");
const providers_1 = require("@ethersproject/providers");
const units_1 = require("@ethersproject/units");
const get_balance = async (signer, token) => {
    let balance;
    if ((0, transfer_1.is_native_token)(token.address)) {
        const provider = token.provider;
        balance = await provider.getBalance(signer.address);
        return (0, units_1.formatUnits)(balance, token.precision);
    }
    if (token.contract instanceof ethers_1.Contract)
        balance = await token.contract.balanceOf(signer.address);
    return (0, units_1.formatUnits)(balance, token.precision);
};
exports.get_balance = get_balance;
/**
 *
 * @param chainId   // Orbiter id
 */
const resolve_provider = (orbiterId) => {
    const chain_info = Object.values(chains_1.default).find((item) => parseInt(item.internalId) === orbiterId);
    const provider = new providers_1.JsonRpcProvider(chain_info.rpc[0]);
    return provider;
};
exports.resolve_provider = resolve_provider;
const log_routes = (txArgs) => {
    console.log('\nRoutes:');
    // From
    console.log(`\tFrom ${txArgs.fromChain.name}: ${txArgs.evmSigner.address} => ${txArgs.maker.makerAddress}`);
    // To
    console.log(`\tTo ${txArgs.toChain.name}: ${txArgs.maker.sender} => ${txArgs.evmSigner.address}`);
};
exports.log_routes = log_routes;
const not_enough_balance = (token, amount, balance) => {
    return (0, units_1.parseUnits)(amount, token.precision) > (0, units_1.parseUnits)(balance, token.precision);
};
exports.not_enough_balance = not_enough_balance;
//# sourceMappingURL=index.js.map
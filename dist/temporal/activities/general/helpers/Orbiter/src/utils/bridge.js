"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.append_network_target = exports.resolve_cross_address = exports.resolve_maker = exports.get_token = exports.get_chain = void 0;
const maker_1_1 = __importDefault(require("../../config/maker-1"));
const makerTest_1_1 = __importDefault(require("../../config/makerTest-1"));
const ethers_1 = require("ethers");
const constant_1 = require("../../config/constant");
const get_chain = (chain, network) => {
    const chain_id = constant_1.NETWORK_NAME_TO_ORBITERID[network][chain];
    const chain_name = chain;
    const network_id = constant_1.NETWORK_NAME_TO_ID[network][chain];
    const bridge_chain = {
        id: chain_id,
        name: chain_name,
        networkId: network_id,
    };
    return bridge_chain;
};
exports.get_chain = get_chain;
const get_token = (maker, chain, provider) => {
    const contract = new ethers_1.Contract(maker.fromTokenAddress, constant_1.ERC20_SOL_ABI, provider);
    const bridge_token = {
        provider,
        chainId: maker.fromChainId,
        name: maker.tokenName,
        precision: maker.fromPrecision,
        address: maker.fromTokenAddress,
        makerAddress: maker.makerAddress,
        contract,
    };
    return bridge_token;
};
exports.get_token = get_token;
const resolve_maker = (token, fromChain, toChain, network) => {
    let searchMaker;
    const pair_token = constant_1.TICKER[token] + '-' + constant_1.TICKER[token];
    const pair_id = fromChain.id + '-' + toChain.id;
    if (network === 'MAINNET')
        searchMaker = Object.entries(maker_1_1.default).find(([key, value]) => pair_id === key && value[pair_token]);
    if (network === 'TESTNET')
        searchMaker = Object.entries(makerTest_1_1.default).find(([key, value]) => pair_id === key && value[pair_token]);
    if (searchMaker === undefined)
        throw `${network}: Bridge from ${fromChain.name} to ${toChain.name} does not exist.`;
    const maker = searchMaker[1];
    return {
        makerAddress: maker[pair_token].makerAddress ?? maker[pair_token].sender,
        ...maker[pair_token],
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        fromChainName: fromChain.name,
        toChainName: toChain.name,
        fromTokenAddress: token,
        tokenName: constant_1.TICKER[token],
    };
};
exports.resolve_maker = resolve_maker;
/**
 * @dev If the exit address on the other chain is not the same we need to specify it as cross address
 *
 */
const resolve_cross_address = (evmSigner, fromChain, toChain) => {
    if (fromChain.name === 'starknet' && toChain.name !== 'starknet')
        return { type: '0x01', value: evmSigner.address };
    return undefined;
};
exports.resolve_cross_address = resolve_cross_address;
const append_network_target = (payAmount, target) => {
    const sliced = payAmount / 10000n;
    const final_amount = sliced * 10000n + BigInt(target);
    return final_amount;
};
exports.append_network_target = append_network_target;
//# sourceMappingURL=bridge.js.map
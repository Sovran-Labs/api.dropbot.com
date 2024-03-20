"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridge = void 0;
const units_1 = require("@ethersproject/units");
const calldatas_1 = require("./calldatas");
const constant_1 = require("../config/constant");
const evm_transfer_1 = require("./transactions/evm_transfer");
const utils_1 = require("./utils");
const bridge_1 = require("./utils/bridge");
/**
 * @name swap
 * @param evmSigner     // etherjs Wallet instance
 * @param starkSigner   // starknet Account instance
 * @param token         // Address of token to be swapped
 * @param fromChain     // Source network's name
 * @param toChain       // Destination network's name
 * @param amount        // (optional) Amount to be sent
 * @param max           // (optional) If set to true, will try to bridge all the balance of the signer
 * @param network       // (optional) In testnet or mainnet
 *
 */
const bridge = async (swap) => {
    const network = swap.network ?? 'TESTNET';
    const max = swap.max ?? false;
    const from_signer = swap.evmSigner;
    if (max === false && swap.amount === undefined)
        throw "You need to specify an amount or set 'max' parameter to true.";
    const from_chain = (0, bridge_1.get_chain)(swap.fromChain, network);
    const to_chain = (0, bridge_1.get_chain)(swap.toChain, network);
    const maker = (0, bridge_1.resolve_maker)(swap.token, from_chain, to_chain, network);
    const from_provider = (0, utils_1.resolve_provider)(from_chain.id);
    const from_token = (0, bridge_1.get_token)(maker, swap.fromChain, from_provider);
    const from_balance = await (0, utils_1.get_balance)(from_signer, from_token);
    if (max === false && swap.amount && (0, utils_1.not_enough_balance)(from_token, swap.amount, from_balance))
        throw `${network}: not enough balance of ${constant_1.TICKER[from_token.address]} amount is ${swap.amount} but balance is ${from_balance}`;
    const amount = max ? from_balance : swap.amount;
    const { payAmount, receiveAmount } = (0, calldatas_1.get_amounts)(from_token, maker, amount, max);
    // VERY IMPORTANT: we need to append this number to the last 4 digit of our pay amount
    // so the maker will know which network we want to send our tokens to.
    // See: https://docs.orbiter.finance/technology ("correct process")
    const network_target = 9000 + to_chain.id;
    const final_amount = (0, bridge_1.append_network_target)(payAmount, network_target);
    const cross_address = (0, bridge_1.resolve_cross_address)(swap.evmSigner, from_chain, to_chain);
    const txArgs = {
        evmSigner: swap.evmSigner,
        token: from_token,
        amount: final_amount,
        fromChain: from_chain,
        toChain: to_chain,
        maker,
        crossAddressExt: cross_address,
        network,
    };
    /*========================================= TX ================================================================================================*/
    console.log(`\nBridging token ${constant_1.TICKER[swap.token]} from ${swap.fromChain} to ${swap.toChain}`);
    console.log(`\tpay amount:     ${(0, units_1.formatUnits)(payAmount, maker.fromPrecision)} ${constant_1.TICKER[swap.token]}`);
    console.log(`\treceive amount: ${(0, units_1.formatUnits)(receiveAmount, maker.toPrecision)} ${constant_1.TICKER[swap.token]}`);
    console.log('\nNetwork:          ', network);
    console.log('Withholding fees: ', maker.tradingFee.toString(), 'ETH');
    console.log('Id code:          ', network_target + '');
    (0, utils_1.log_routes)(txArgs);
    await (0, evm_transfer_1.evm_transfer)(txArgs);
    /*=============================================================================================================================================*/
};
exports.bridge = bridge;
//# sourceMappingURL=orbiter.js.map
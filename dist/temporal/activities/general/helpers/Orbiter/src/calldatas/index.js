"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_receive_amount = exports.get_amounts = void 0;
const units_1 = require("@ethersproject/units");
const get_amounts = (token, maker, amount, max) => {
    const { fromChainName, toChainName, tradingFee, fromPrecision, minPrice, maxPrice } = maker;
    let pay_amount;
    const b_amount = (0, units_1.parseUnits)(amount, fromPrecision);
    const b_min_price = (0, units_1.parseUnits)(minPrice.toString(), fromPrecision);
    const b_max_price = (0, units_1.parseUnits)(maxPrice.toString(), fromPrecision);
    // Check minPrice, maxPrice
    if (b_amount < b_min_price)
        throw `Amount less than minPrice( ${minPrice} ), token: ${token.name}, fromChain: ${fromChainName}, toChain: ${toChainName}`;
    if (b_amount > b_max_price)
        throw `Amount greater than maxPrice( ${maxPrice} ), token: ${token.name}, fromChain: ${fromChainName}, toChain: ${toChainName}`;
    if (max)
        pay_amount = b_amount.sub(BigInt(10000)); // letting enough for identification ID
    else
        pay_amount = b_amount.add((0, units_1.parseUnits)(tradingFee.toString(), fromPrecision));
    const receive_amount = (0, exports.get_receive_amount)((0, units_1.formatUnits)(pay_amount, fromPrecision), maker);
    return { payAmount: pay_amount, receiveAmount: receive_amount };
};
exports.get_amounts = get_amounts;
const get_receive_amount = (inputAmount, selectMakerInfo) => {
    const { fromPrecision, tradingFee, gasFee } = selectMakerInfo;
    const output_minus_tradingFee = (0, units_1.parseUnits)(inputAmount, fromPrecision).sub((0, units_1.parseUnits)(tradingFee.toString(), fromPrecision));
    const gas_fee = output_minus_tradingFee.mul(BigInt(gasFee * 100)).div(BigInt(100000));
    const receive_amount = output_minus_tradingFee.sub(gas_fee);
    return receive_amount.toBigInt();
};
exports.get_receive_amount = get_receive_amount;
//# sourceMappingURL=index.js.map
import { parseUnits } from 'ethers';
import BigNumber from 'bignumber.js';

export function getAmounts(
  crossChainRouter: any,
  amount: string,
  max: boolean
): { payAmount: bigint; receiveAmount: bigint } {
  let pay_amount: bigint;
  const { tradeFee, minAmt, maxAmt, srcChain, tgtChain, srcToken } = crossChainRouter;
  const b_amount = BigInt(amount);
  const b_min_price = parseUnits(minAmt, 'ether'); // TODO - add support for bridging tokens with different base units
  const b_max_price = parseUnits(maxAmt, 'ether'); // TODO - add support for bridging tokens with different base units
  if (b_amount < b_min_price)
    throw `Amount less than minPrice( ${minAmt} ), token: ${srcToken}, fromChain: ${srcChain}, toChain: ${tgtChain}`;
  if (b_amount > b_max_price)
    throw `Amount greater than maxPrice( ${maxAmt} ), token: ${srcToken}, fromChain: ${srcChain}, toChain: ${tgtChain}`;
  if (max) pay_amount = b_amount - BigInt(10000); // leaving space for target network ID
  else pay_amount = b_amount + BigInt(tradeFee);
  const receive_amount = get_receive_amount(pay_amount.toString(), crossChainRouter);
  return { payAmount: pay_amount, receiveAmount: receive_amount };
}

export const get_receive_amount = (inputAmount: string, crossChainRouter: any): bigint => {
  const { tradeFee, withholdingFee } = crossChainRouter;
  const receive_amount = BigNumber(inputAmount)
    .minus(BigNumber(tradeFee))
    .minus(BigNumber(parseUnits(withholdingFee, 'ether').toString()));
  return BigInt(receive_amount.toFixed(0));
};

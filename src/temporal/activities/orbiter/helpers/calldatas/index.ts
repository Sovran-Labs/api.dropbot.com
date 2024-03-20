import { ethers } from 'ethers';
import { BridgeToken, CrossChainRouterType } from '../../types';

export const get_amounts = (
  token: BridgeToken,
  crossChainRouter: CrossChainRouterType,
  amount: string,
  max: boolean,
  srcChain: any,
  srcToken: any,
  tgtChain: any,
  tgtToken: any
): { payAmount: bigint; receiveAmount: bigint } => {
  const { tradeFee, minAmt, maxAmt } = crossChainRouter;
  let pay_amount: any;

  const b_amount = ethers.parseUnits(amount, srcToken.decimals);
  const b_min_price = ethers.parseUnits(minAmt.toString(), srcToken.decimals);
  const b_max_price = ethers.parseUnits(maxAmt.toString(), srcToken.decimals);

  // Check minPrice, maxPrice
  if (b_amount < b_min_price)
    throw `Amount less than minPrice( ${minAmt} ), token: ${token.name}, fromChain: ${srcChain}, toChain: ${tgtChain}`;
  if (b_amount > b_max_price)
    throw `Amount greater than maxPrice( ${maxAmt} ), token: ${token.name}, fromChain: ${srcChain}, toChain: ${tgtChain}`;

  if (max) pay_amount = b_amount - BigInt(10000); // letting enough for identification ID
  else pay_amount = b_amount + BigInt(tradeFee);

  const receive_amount = get_receive_amount(
    ethers.formatUnits(pay_amount, srcToken.precision),
    crossChainRouter,
    srcToken.precision
  );

  return { payAmount: pay_amount, receiveAmount: receive_amount };
};

export const get_receive_amount = (
  inputAmount: string,
  routerInfo: CrossChainRouterType,
  srcPrecision: number
): bigint => {
  const { tradeFee } = routerInfo;

  const output_minus_tradingFee =
    ethers.parseUnits(inputAmount, srcPrecision) - ethers.parseUnits(tradeFee.toString(), srcPrecision);

  //   const gas_fee = (output_minus_tradingFee * BigInt(gasFee * 100)) / BigInt(100000);

  const receive_amount = output_minus_tradingFee; // TODO perhaps we should add gas_fee here?

  return receive_amount;
};

import { get_quote } from './get_quote';
import { ethers, Wallet } from 'ethers';
import {
  Pool,
  Trade,
  Token,
  TradeType,
  Chains,
  SwapOptions,
  QuoteExactInputSingleParams,
  QuoteExactOutputSingleParams,
} from './types';
import { get_amount_out } from './get_amount_out';
import { get_amount_in } from './get_amount_in';

export const get_trade = async (
  signer: Wallet,
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string | null,
  amountOut: string | null,
  pool: Pool,
  chain: Chains,
  options: SwapOptions
): Promise<Trade> => {
  let amount_out_min: bigint | undefined;
  let amount_in_max: bigint | undefined;

  const tradeType = amountIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;

  let amount_in: bigint = ethers.parseUnits(amountIn ?? '0', tokenIn.decimals);
  let amount_out: bigint = ethers.parseUnits(amountOut ?? '0', tokenOut.decimals);

  if (tradeType === TradeType.EXACT_INPUT) {
    amount_out = await get_amount_out(tokenIn, tokenOut, amount_in, pool);
    amount_out_min = (amount_out * BigInt(parseInt(((100 - options.slipage!) * 100).toString()))) / BigInt(100 * 100);
  }
  if (tradeType === TradeType.EXACT_OUTPUT) {
    amount_in = await get_amount_in(tokenIn, tokenOut, amount_out, pool);
    amount_in_max = (amount_in * BigInt(parseInt(((options.slipage! + 100) * 100).toString()))) / BigInt(100 * 100);
  }

  const trade: Trade = {
    tokenIn,
    tokenOut,
    path: [tokenIn.address, tokenOut.address],
    amountIn: amount_in,
    amountOut: amount_out,
    amountInMax: amount_in_max,
    amountOutMin: amount_out_min,
    sqrtPriceLimitX96: BigInt(0),
    to: signer.address,
    priceImpact: 0,
    pool,
    slipage: options.slipage!,
    tradeType,
    deadline: options.deadline!,
    chain,
  };

  return trade;
};

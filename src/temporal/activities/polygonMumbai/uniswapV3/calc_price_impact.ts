import { ethers } from 'ethers';
import { Pool, Trade } from './types';
import { get_quote } from './get_quote';

export const calc_price_impact = async (trade: Trade, pool: Pool): Promise<number> => {
  const amountIn: number = parseFloat(ethers.formatUnits(trade.amountIn, trade.tokenIn.decimals));

  const quoteOut: bigint = get_quote(amountIn, trade.tokenIn, pool);
  const quoteString: string = ethers.formatUnits(quoteOut, trade.tokenOut.decimals);

  const amountOut: string = ethers.formatUnits(trade.amountOut, trade.tokenOut.decimals);

  const priceImpact = 100 - (parseFloat(amountOut) * 100) / parseFloat(quoteString);

  return priceImpact;
};

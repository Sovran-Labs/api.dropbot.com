import { ethers } from 'ethers';
import { Pool, Token } from './types';

export const get_quote = (amountA: number, tokenA: Token, pool: Pool): bigint => {
  const { sqrtPriceX96 } = pool;

  const x = pool.tokenA;
  const y = pool.tokenB;

  // see https://ethereum.stackexchange.com/questions/9868 5/computing-the-uniswap-v3-pair-price-from-q64-96-number
  // see https://www.youtube.com/watch?v=hKhdQl126Ys
  const priceX96_to_price0 = (parseFloat(sqrtPriceX96.toString()) / 2 ** 96) ** 2;

  const priceX = priceX96_to_price0 * (10 ** x.decimals / 10 ** y.decimals);
  const priceY = 1 / priceX;

  const token_price = BigInt(tokenA.address) === BigInt(pool.tokenA.address) ? priceX : priceY;

  const token_quoted = BigInt(tokenA.address) === BigInt(pool.tokenA.address) ? pool.tokenB : pool.tokenA;
  const quote = (token_price * amountA).toFixed(token_quoted.decimals);

  const amountB = ethers.parseUnits(quote, token_quoted.decimals);

  return amountB;
};

import { Contract, Wallet } from 'ethers';
import { Chains, Token, Pool } from './types';
import { get_best_fee } from './get_best_fee';
import { FACTORY, FACTORY_ABI, POOL_ABI, QUOTER_V2, QUOTER_V2_ABI } from './constants';
import { sort_tokens } from './sort_tokens';

export const get_pool = async (tokenA: Token, tokenB: Token, signer: Wallet, chain: Chains): Promise<Pool> => {
  const QuoterV2 = new Contract(QUOTER_V2[chain], QUOTER_V2_ABI, signer);
  const Factory = new Contract(FACTORY[chain], FACTORY_ABI, signer);

  const bestFee = get_best_fee(tokenA, tokenB, chain);
  const pair = await Factory.getPool(tokenA.address, tokenB.address, bestFee);

  if (BigInt(pair) === BigInt(0))
    throw `Error: pair for token ${tokenA.symbol}/${tokenB.symbol} Fee: ${bestFee} not created yet.`;

  const Pool = new Contract(pair, POOL_ABI, signer);
  const [slot0, liquidity, tickSpacing] = await Promise.all([Pool.slot0(), Pool.liquidity(), Pool.tickSpacing()]);
  const { token0, token1 } = sort_tokens(tokenA, tokenB, '0', '0');

  const pool = {
    tokenA: token0,
    tokenB: token1,
    pair,
    fees: bestFee,
    tickSpacing: parseInt(tickSpacing.toString()),
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: parseInt(slot0[1].toString()),
    Quoter: QuoterV2,
    Pool,
  };

  return pool;
};

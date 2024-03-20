import { BEST_FEE_POOL } from './feePool';
import { Chains, Token } from './types';

export const get_best_fee = (tokenA: Token, tokenB: Token, chain: Chains): number => {
  const pool = tokenA.symbol + '_' + tokenB.symbol;

  const bestFee = BEST_FEE_POOL[chain][pool];

  if (bestFee === undefined) throw `Error: Unknown best fee for pool ${pool} on ${chain}`;

  return bestFee;
};

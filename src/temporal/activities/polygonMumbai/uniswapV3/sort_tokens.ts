import { ethers } from 'ethers';
import { Token } from './types';

export const sort_tokens = (
  tokenA: Token,
  tokenB: Token,
  amountA: string | null,
  amountB: string | null
): { token0: Token; token1: Token; amount0: bigint; amount1: bigint } => {
  const token0 = BigInt(tokenA.address) < BigInt(tokenB.address) ? tokenA : tokenB;
  const token1 = BigInt(tokenA.address) > BigInt(tokenB.address) ? tokenA : tokenB;
  const amount0 =
    BigInt(token0.address) === BigInt(tokenA.address)
      ? ethers.parseUnits(amountA ?? '0', tokenA.decimals)
      : ethers.parseUnits(amountB ?? '0', tokenB.decimals);
  const amount1 =
    BigInt(token1.address) === BigInt(tokenA.address)
      ? ethers.parseUnits(amountA ?? '0', tokenA.decimals)
      : ethers.parseUnits(amountB ?? '0', tokenB.decimals);

  return { token0, token1, amount0, amount1 };
};

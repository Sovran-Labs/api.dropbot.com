import { get_quote } from '.';
import { Wallet, ethers } from 'ethers';
import { ZERO_ADDRESS } from '@/src/temporal/activities/flow7a/helpers/config/constants';
import { Pool, Trade, Token, SwapStep, SwapPath, WithdrawMode } from '@/src/temporal/activities/flow7a/helpers/types';

export const get_trade = async (
  signer: Wallet,
  path: [string, string],
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string,
  pool: Pool,
  slipage: number,
  deadline: number | undefined,
  network: 'TESTNET' | 'MAINNET'
): Promise<Trade> => {
  const reserveIn: bigint = BigInt(tokenIn.address) === BigInt(pool.tokenA.address) ? pool.reserveA : pool.reserveB;
  const reserveOut: bigint = BigInt(tokenOut.address) === BigInt(pool.tokenA.address) ? pool.reserveA : pool.reserveB;

  const amount_in: bigint = ethers.parseUnits(amountIn, tokenIn.decimals);
  const amount_out: bigint = get_amount_out(amount_in, reserveIn, reserveOut);
  const amount_out_min: bigint = (amount_out * BigInt(100 * 100 - slipage * 100)) / BigInt(100 * 100);

  // There is only 1 step (2 tokens involved in the tx)
  const steps: SwapStep[] = [
    {
      pool: pool.pair,
      data: encode_swap(tokenIn.address, signer.address, WithdrawMode.WITHDRAW_AND_UNWRAP_TO_NATIVE_ETH),
      callback: ZERO_ADDRESS, // we don't have a callback
      callbackData: '0x',
    },
  ];

  // There is only 1 step (2 tokens involved in the tx)
  const paths: SwapPath[] = [
    {
      // eslint-disable-next-line object-shorthand
      steps: steps,
      tokenIn: path[0],
      amountIn: amount_in,
    },
  ];

  return {
    // eslint-disable-next-line object-shorthand
    path: path,
    // eslint-disable-next-line object-shorthand
    paths: paths,
    tokenFrom: tokenIn,
    tokenTo: tokenOut,
    // eslint-disable-next-line object-shorthand
    pool: pool,
    amountIn: amount_in,
    amountOut: amount_out,
    amountOutMin: amount_out_min,
    priceImpact: 0,
    deadline: deadline ?? Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
    // eslint-disable-next-line object-shorthand
    network: network,
  };
};

export const calc_price_impact = async (trade: Trade, pool: Pool): Promise<number> => {
  const quoteOut: string = get_quote(
    ethers.formatUnits(trade.amountIn, trade.tokenFrom.decimals),
    trade.tokenFrom,
    trade.tokenTo,
    pool
  );
  const amountOut: string = ethers.formatUnits(trade.amountOut, trade.tokenTo.decimals);

  const priceImpact = 100 - (parseFloat(amountOut) * 100) / parseFloat(quoteOut);

  return priceImpact;
};

export const encode_swap = (tokenIn: string, signerAddress: string, withdrawMode: WithdrawMode): string => {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const encoded_data = abiCoder.encode(['address', 'address', 'uint8'], [tokenIn, signerAddress, withdrawMode]);

  return encoded_data;
};

export const get_amount_out = (amount_in: bigint, reserve_in: bigint, reserve_out: bigint): bigint => {
  const amountInWithFee = amount_in * BigInt(1000); // No fees
  const numerator = amountInWithFee * reserve_out;
  const denominator = reserve_in * BigInt(1000) + amountInWithFee;
  const amount_out = numerator / denominator;

  return amount_out;
};

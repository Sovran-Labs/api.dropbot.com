import { Wallet } from 'ethers';
import { TICKER } from '@/src/temporal/activities/flow7b/helpers/config/constants';
import { Token, Pool, Trade } from '@/src/temporal/activities/flow7b/helpers/types';
import { get_balance, get_pool, get_token } from '../utils';
import { calc_price_impact, get_trade } from '../utils/swap';

export const get_swap_tx = async (
  signer: Wallet,
  path: [string, string],
  amountIn: string,
  network: 'TESTNET' | 'MAINNET',
  slipage: number,
  priceImpact: number,
  deadline?: number
): Promise<Trade> => {
  const balance_in = await get_balance(path[0], signer);
  const token_in: Token = await get_token(path[0], network);
  const token_out: Token = await get_token(path[1], network);
  const pool: Pool = await get_pool(token_in, token_out, network, signer);
  const trade: Trade = await get_trade(signer, path, token_in, token_out, amountIn, pool, slipage, deadline, network);

  trade.priceImpact = await calc_price_impact(trade, pool);
  if (trade.priceImpact > priceImpact) throw new Error(`Price impact tolerance exceeded: ${trade.priceImpact}`);
  if (balance_in.bigint === BigInt(0)) throw new Error(`Error: Balance of token ${TICKER[path[0]]} is empty`);

  return trade;
};

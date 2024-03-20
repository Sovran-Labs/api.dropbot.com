import fs from 'fs';
import chains from './chains';
import { BEST_FEE_POOL } from './feePool';
import { Token, Pool, Chains, Position } from './types';
import { ethers, Wallet, Contract, JsonRpcProvider } from 'ethers';
import {
  ERC20_ABI,
  TOKENS,
  CHAIN_ID,
  QUOTER_V2,
  QUOTER_V2_ABI,
  CHAIN_ID_TO_NAME,
  FACTORY,
  FACTORY_ABI,
  POOL_ABI,
} from './constants';
import { is_native } from './is_native';

export const get_balance = async (
  tokenAddress: string,
  signer: Wallet
): Promise<{ bigint: bigint; string: string; decimals: number }> => {
  let balance: bigint;
  let decimals: number;

  const erc20 = new Contract(tokenAddress, ERC20_ABI, signer);
  const network = await signer.provider?.getNetwork();

  if (is_native(tokenAddress, CHAIN_ID_TO_NAME[parseInt(network!.chainId.toString())])) {
    balance = await signer.provider!.getBalance(signer.address);
    decimals = 18;
  } else {
    balance = await erc20.balanceOf(signer.address);
    decimals = await erc20.decimals();
  }

  const formated = ethers.formatUnits(balance, decimals);

  return {
    bigint: balance,
    string: formated,
    decimals,
  };
};

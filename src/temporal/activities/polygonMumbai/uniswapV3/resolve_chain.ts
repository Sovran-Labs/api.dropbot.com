import { ethers, Wallet, Contract, JsonRpcProvider } from 'ethers';
import chains from './chains';

import { Token, Pool, Chains, Position } from './types';

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

/**
 *
 * @param chainId   // Orbiter id
 */
export const resolve_provider = (chainId: number): JsonRpcProvider => {
  const chain_info = Object.values(chains).find((item) => parseInt(item.chainId) === chainId);

  const provider = new JsonRpcProvider(chain_info!.rpc[0]);

  return provider;
};

export const resolve_chain = (signer: Wallet, chain: Chains): Wallet => {
  const provider = resolve_provider(CHAIN_ID[chain]);
  signer = new Wallet(signer.privateKey, provider);

  return signer;
};

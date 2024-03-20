import { resolve_chain } from './resolve_chain';
import { Token, Pool, Chains, SwapOptions, Position } from './types';
import { ethers, Wallet, Contract, JsonRpcProvider } from 'ethers';
import { DEFAULT_REMOVE_OPTION, DEFAULT_OPTION, NFT_MANAGER, SWAP_ROUTER } from './constants';
import { get_swap_tx } from './get_swap_tx';
import { exec_approve } from './exec_approve';
import { get_approve_tx } from './get_approve_tx';
import { exec_swap } from './exec_swap';

export const swap = async (
  signer: Wallet,
  path: [string, string],
  amountIn: string | null,
  amountOut: string | null,
  chain: Chains,
  options?: SwapOptions
) => {
  signer = resolve_chain(signer, chain);
  options = { ...DEFAULT_REMOVE_OPTION, ...options };

  if (path[0] === undefined || path[1] === undefined)
    throw `Error: token undefined path[0]: ${path[0]}, path[1]: ${path[1]}.`;
  if (options.slipage! < 0.01 || options.slipage! > 100)
    throw `Slipage parameter must be a number between 0.01 and 100.`;

  const swapTx = await get_swap_tx(signer, path, amountIn, amountOut, chain, options);
  const approve_amount = ethers.formatUnits(
    swapTx.trade.amountInMax ?? swapTx.trade.amountIn,
    swapTx.trade.tokenIn.decimals
  );

  const approveTx = await get_approve_tx(signer, swapTx.trade.tokenIn, SWAP_ROUTER[chain], approve_amount, chain);

  /*========================================= TX =================================================================================================*/
  await exec_approve(approveTx);
  await exec_swap(swapTx!);
  /*=============================================================================================================================================*/
};

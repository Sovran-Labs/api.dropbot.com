import { Wallet } from 'ethers';
import { get_swap_tx } from './calldatas/swapCalldata';
import { get_approve_tx } from './calldatas/approveCalldata';
import { exec_approve } from './transactions/approve';
import { is_native } from './utils';
import { exec_swap } from './transactions/swap';

/**
 * @name swap
 * @param signer        - Wallet to perform the swap
 * @param path          - token swap from path[0](input) to path[1](output)
 * @param amountIn      - The amount of exact token (in token) to be swapped for the other one **(out token)**
 * @param network       - (optional) 'testnet' is the default one
 * @param slipage       - (optional) protection against price movement or to high price impact default is 0.5%
 * @param priceImpact   - (optional) protection against price movement or to high price impact default is 2%
 * @param deadline      - (optional) Maximum amount of time (in unix time) before the trade get reverted
 */
export const swap = async (
  signer: Wallet,
  path: [string, string],
  amountIn: string,
  network: 'TESTNET' | 'MAINNET' = 'TESTNET',
  slipage = 0.5, // this represent 0.5% of slipage
  priceImpact = 0.5, // this represent 2% of allowed price impact (default)
  deadline?: number
) => {
  let approveTx: any;

  if (slipage < 0.01 || slipage > 100) throw `Slipage parameter must be a number between 0.01 and 100`;

  // Get swap Tx
  const swapTx = await get_swap_tx(signer, path, amountIn, network, slipage, priceImpact, deadline);
  // Get approve Tx
  if (is_native(path[0]) === false) approveTx = await get_approve_tx(signer, amountIn, path[0], network);

  /*========================================= TX =================================================================================================*/
  if (approveTx) {
    await exec_approve(approveTx, signer);
  }

  await exec_swap(swapTx, signer);
  /*=============================================================================================================================================*/
};

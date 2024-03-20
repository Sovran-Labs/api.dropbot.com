import { Trade } from '@/src/temporal/activities/flow7b/helpers/types';
import { is_native } from '@/src/temporal/activities/flow7b/helpers/utils';
import { ROUTER_ABI, ROUTER_ADDRESS, TICKER } from '@/src/temporal/activities/flow7b/helpers/config/constants';
import { ethers, Contract, Wallet, TransactionResponse, TransactionReceipt } from 'ethers';

export const exec_swap = async (swapTx: Trade, signer: Wallet): Promise<TransactionReceipt> => {
  let tx: TransactionResponse;
  let receipt: TransactionReceipt | null | undefined;

  const { paths, path, tokenFrom, tokenTo, amountIn, amountOutMin, deadline, network } = swapTx;
  const Router: Contract = new Contract(ROUTER_ADDRESS[network], ROUTER_ABI, signer);

  console.log(
    `\nSwapping exact ${ethers.formatUnits(amountIn, tokenFrom.decimals)} ${
      TICKER[path[0]]
    } for (min)${ethers.formatUnits(amountOutMin, tokenTo.decimals)} ${TICKER[path[1]]}`
  );

  // eslint-disable-next-line prefer-const
  tx = await Router.swap(paths, amountOutMin, deadline, { value: is_native(path[0]) ? amountIn : undefined });
  // eslint-disable-next-line prefer-const
  receipt = await signer.provider?.waitForTransaction(tx.hash);

  console.log('\nTransaction validated!');
  console.log('hash: ', tx.hash);
  console.log('Fees: ', ethers.formatEther(receipt?.fee ?? '0'));

  return receipt as TransactionReceipt;
};

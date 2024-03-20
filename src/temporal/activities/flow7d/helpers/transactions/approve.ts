import { ApproveTx } from '@/src/temporal/activities/flow7a/helpers/types';
import { ROUTER_ADDRESS, TICKER } from '@/src/temporal/activities/flow7a/helpers/config/constants';
import { TransactionResponse, TransactionReceipt, Wallet, ethers } from 'ethers';

export const exec_approve = async (
  approveTx: ApproveTx | undefined,
  signer: Wallet
): Promise<TransactionReceipt | void> => {
  let tx: TransactionResponse;
  let receipt: TransactionReceipt | null | undefined;

  if (approveTx === undefined) return;

  const { Erc20, spender, amount, decimals, network } = approveTx;

  console.log(
    `\nApproving ${ROUTER_ADDRESS[network]} to spend ${ethers.formatUnits(amount, decimals)} ${
      TICKER[await Erc20.getAddress()] ?? 'LP'
    }...`
  );

  // eslint-disable-next-line prefer-const
  tx = await Erc20.approve(spender, amount);
  // eslint-disable-next-line prefer-const
  receipt = await tx.wait(16);

  console.log('\nApprove transaction validated!!!');
  console.log('hash: ', tx.hash);
  console.log('Fees: ', ethers.formatEther(receipt?.fee ?? '0'));

  return receipt as TransactionReceipt;
};

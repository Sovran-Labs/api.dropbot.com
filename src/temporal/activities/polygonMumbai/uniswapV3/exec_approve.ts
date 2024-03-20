import { ApproveTx } from './types';
import { TransactionResponse, TransactionReceipt, ethers } from 'ethers';

export const exec_approve = async (approveTx: ApproveTx | undefined): Promise<TransactionReceipt | undefined> => {
  if (approveTx === undefined) return;

  const { signer, Erc20, token, spender, amount } = approveTx;

  console.log(
    `\n\nApproving ${spender} to spend ${ethers.formatUnits(amount, token.decimals)} ${token.symbol ?? 'LP'}...`
  );

  const nonce = await signer.getNonce();
  const feedata = await signer.provider?.getFeeData();
  const gasLimit = await Erc20.approve.estimateGas(spender, amount, { nonce });

  const tx: TransactionResponse = await Erc20.approve(spender, amount, {
    nonce,
    gasLimit: gasLimit * BigInt(2),
    gasPrice: (feedata!.gasPrice! * BigInt(10)) / BigInt(5),
  });
  const receipt: TransactionReceipt | null | undefined = await tx.wait();

  console.log('\nTransaction validated!');
  console.log('hash: ', tx.hash);
  console.log('Fees: ', ethers.formatEther(receipt?.fee ?? '0'), 'ETH');

  return receipt as TransactionReceipt;
};

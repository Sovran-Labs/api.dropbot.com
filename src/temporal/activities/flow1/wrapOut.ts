import { Blockchains } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { Contract, Wallet } from 'ethers';
import { connectDB } from '@/src/temporal/clients/db';
import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import WETH9_ABI from '@/src/abis/weth9';
import assert from 'assert';
import { sleep } from '@/src/scripts/utils/sleep';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export async function FLOW_1_wrapOut(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  wrappedNativeTokenAddress: string;
  amount: number;
}): Promise<any> {
  await connectDB();

  const doc = await FlowModel.findById(args.flowId);
  const { jsonRpcProvider } = await polygonMumbaiRpcProvider();
  const feeData = await jsonRpcProvider?.getFeeData();

  assert(feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas, 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER');

  const walletAccountModel = await WalletAccountModel.findOne({ account: args.account });

  const signer = new Wallet(walletAccountModel!.pk, jsonRpcProvider);
  const wmatic = new Contract(args.wrappedNativeTokenAddress, WETH9_ABI, signer);

  const preBalance = await jsonRpcProvider?.getBalance(signer.address);
  const preWMATICBalance = await wmatic.balanceOf(args.account);

  console.log('BEFORE');
  console.log('preBalance', preBalance);
  console.log('preWMATICBalance', preWMATICBalance);

  const txn = await wmatic.withdraw(preWMATICBalance);

  await sleep(10000);

  const postBalance = await signer.provider?.getBalance(signer.address);
  const postWMATICBalance = await wmatic.balanceOf(signer.address);

  console.log('AFTER');
  console.log('postBalance', postBalance);
  console.log('postWMATICBalance', postWMATICBalance);

  const metadata = {
    isTxn: true,
    txnHash: txn.hash,
    preBalance: preBalance.toString(),
    preWMATICBalance: preWMATICBalance.toString(),
    maxFeePerGas: feeData.maxFeePerGas.toString(),
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.toString(),
    amount: args.amount,
    explorerLink: `https://mumbai.polygonscan.com/tx/${txn.hash}`,
  };

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.actionLog.${args.actionUuid}`]: {
          name: args.actionName,
          metadata,
        },
      },
    }
  );

  return metadata;
}

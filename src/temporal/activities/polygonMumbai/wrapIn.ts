import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { connectDB } from '../../clients/db';
import { Contract, parseUnits, Wallet } from 'ethers';
import { Blockchains } from '../../../config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import assert from 'assert';
import WETH9_ABI from '../../../abis/weth9';

export async function POLYGON_MUMBAI_wrapIn(args: {
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

  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);
  const wmatic = new Contract(args.wrappedNativeTokenAddress, WETH9_ABI, signer);

  const preBalance = await jsonRpcProvider?.getBalance(signer.address);
  const preWMATICBalance = await wmatic.balanceOf(args.account);

  const txn = await signer.sendTransaction({
    from: signer.address,
    to: args.wrappedNativeTokenAddress,
    value: parseUnits(`${args.amount}`, 'wei'),
    maxFeePerGas: feeData?.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  });

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

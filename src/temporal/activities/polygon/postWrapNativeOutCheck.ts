import { polygonRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonRpcProvider';
import { connectDB } from '@/src/temporal/clients/db';
import { Contract, Wallet } from 'ethers';
import { Blockchains } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import WETH9_ABI from '@/src/abis/weth9';
import assert from 'assert';

export async function POLYGON_postWrapNativeOutCheck(args: {
  txnHash: string;
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  wrappedNativeTokenAddress: string;
  amount: number;
  preBalance: string;
  preWMATICBalance: string;
}): Promise<any> {
  await connectDB();

  const doc = await FlowModel.findById(args.flowId);
  const { jsonRpcProvider } = await polygonRpcProvider();
  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);
  const wmatic = new Contract(args.wrappedNativeTokenAddress, WETH9_ABI, signer);

  // Get the transaction receipt using the hash
  const receipt = await jsonRpcProvider.getTransactionReceipt(args.txnHash);
  // Get the transaction details to get the gas price
  const confirmedTxn = await jsonRpcProvider.getTransaction(args.txnHash);

  let txnFee;
  if (receipt && confirmedTxn && confirmedTxn.gasPrice) {
    txnFee = receipt?.gasUsed * confirmedTxn.gasPrice;
  } else {
    throw 'UNABLE_TO_RETRIEVE_TXN_GAS_PRICE';
  }

  const postBalance = await jsonRpcProvider?.getBalance(signer.address);
  const postWMATICBalance = await wmatic.balanceOf(args.account);

  assert(BigInt(args.preBalance) + BigInt(args.preWMATICBalance) - BigInt(txnFee) - BigInt(postBalance) === BigInt(0));
  assert(BigInt(postWMATICBalance) === BigInt(0));

  const actionMetadata = {
    isTxnPostCheck: true,
    txnHash: args.txnHash,
    preBalance: args.preBalance,
    preWMATICBalance: args.preWMATICBalance,
    postBalance: postBalance.toString(),
    postWMATICBalance: postWMATICBalance.toString(),
    txnFee: txnFee.toString(),
    shouldBeZero: (
      BigInt(args.preBalance) +
      BigInt(args.preWMATICBalance) -
      BigInt(txnFee) -
      BigInt(postBalance)
    ).toString(),
    WMATICshouldBeZero: BigInt(postWMATICBalance),
  };

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.actionLog.${args.actionUuid}`]: {
          name: args.actionName,
          metadata: actionMetadata,
        },
      },
    }
  );

  return actionMetadata;
}

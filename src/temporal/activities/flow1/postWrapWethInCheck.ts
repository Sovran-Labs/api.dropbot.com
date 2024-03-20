import { polygonMumbaiRpcProvider } from '../../clients/rpcProviders/polygonMumbaiRpcProvider';
import { connectDB } from '../../clients/db';
import { Contract, Wallet } from 'ethers';
import { Blockchains } from '../../../config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import WETH9_ABI from '../../../abis/weth9';
import assert from 'assert';

export async function FLOW_1_postWrapWethInCheck(args: {
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
  //   await connectDB();

  //   const doc = await FlowModel.findById(args.flowId);
  //   const { jsonRpcProvider } = await polygonMumbaiRpcProvider();
  //   const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);
  //   const wmatic = new Contract(args.wrappedNativeTokenAddress, WETH9_ABI, signer);

  //   // --- --- ---

  //   // Get the transaction receipt using the hash
  //   const receipt = await jsonRpcProvider.getTransactionReceipt(args.txnHash);
  //   // Get the transaction details to get the gas price
  //   const confirmedTxn = await jsonRpcProvider.getTransaction(args.txnHash);

  //   let txnFee;
  //   if (receipt && confirmedTxn && confirmedTxn.gasPrice) {
  //     txnFee = receipt?.gasUsed * confirmedTxn.gasPrice;
  //   } else {
  //     throw 'UNABLE_TO_RETRIEVE_TXN_GAS_PRICE';
  //   }

  //   const postBalance = await jsonRpcProvider?.getBalance(signer.address);
  //   const postWMATICBalance = await wmatic.balanceOf(args.account);

  //   assert(BigInt(args.preBalance) - BigInt(txnFee) - BigInt(args.amount) === BigInt(postBalance));
  //   assert(BigInt(args.preBalance) - BigInt(txnFee) - BigInt(args.amount) - postBalance === BigInt(0));

  //   const actionMetadata = {
  //     txnHash: args.txnHash,
  //     preBalance: args.preBalance,
  //     preWMATICBalance: args.preWMATICBalance,
  //     postBalance: postBalance.toString(),
  //     postWMATICBalance: postWMATICBalance.toString(),
  //     txnFee: txnFee.toString(),
  //     differenceInBalance: (BigInt(args.preBalance) - BigInt(postBalance)).toString(),
  //     differenceInWMATIC: (postWMATICBalance - BigInt(args.preWMATICBalance)).toString(),
  //     shouldBeZero: (BigInt(args.preBalance) - BigInt(txnFee) - BigInt(args.amount) - BigInt(postBalance)).toString(),
  //   };

  //   await FlowModel.updateOne(
  //     { _id: args.flowId },
  //     {
  //       $set: {
  //         [`state.actionLog.${args.actionUuid}`]: {
  //           name: args.actionName,
  //           metadata: actionMetadata,
  //         },
  //       },
  //     }
  //   );

  //   return actionMetadata;

  return {};
}

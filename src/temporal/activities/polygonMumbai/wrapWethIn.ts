import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { connectDB } from '../../clients/db';
import { Contract, parseUnits, Wallet } from 'ethers';
import { Blockchains } from '../../../config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import assert from 'assert';
import ABI from '@/src/abis/UChildERC20';
import { IWrapWethInInput } from '@/src/ts/interfaces/actions/activities/wrapWethIn/input';
import { BlockchainExplorerUrls } from '@/src/config/BlockchainExplorerUrls';
import BigNumber from 'bignumber.js';

export async function POLYGON_MUMBAI_wrapWethIn(args: IWrapWethInInput): Promise<any> {
  await connectDB();

  const doc = await FlowModel.findById(args.flowId);
  const { jsonRpcProvider } = await polygonMumbaiRpcProvider();
  const feeData = await jsonRpcProvider?.getFeeData();

  assert(feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas, 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER');

  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);
  const wethContract = new Contract(args.wethAddress, ABI, signer);

  const preBalance = await jsonRpcProvider?.getBalance(signer.address);
  const preWETHBalance = await wethContract.balanceOf(args.account);

  //   debugger;

  const amountToWrap = BigNumber(preBalance.toString())
    .multipliedBy(args.percentOfBalance / 100)
    .toFixed(0);

  console.log(BigNumber(amountToWrap).dividedBy(BigNumber(preBalance.toString())));
  console.log(BigNumber(amountToWrap).dividedBy(BigNumber(preBalance.toString())).toString());

  //   debugger;

  //   const txn = await wethContract.deposit(args.account, toUtf8Bytes(parseUnits(amountToWrap, 'ether').toString()));

  //   const txn = await signer.sendTransaction({
  //     from: signer.address,
  //     to: args.wethAddress,
  //     value: parseUnits(amountToWrap, 'wei'),
  //     maxFeePerGas: feeData?.maxFeePerGas,
  //     maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  //   });

  const metadata = {
    // txnHash: txn.hash,
    preBalance: preBalance.toString(),
    preWETHBalance: preWETHBalance.toString(),
    amountToWrap: parseUnits(amountToWrap, 'wei'),
    percentOfBalance: args.percentOfBalance,
    maxFeePerGas: feeData.maxFeePerGas.toString(),
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.toString(),
    // explorerLink: BlockchainExplorerUrls[args.blockchain].viewTxn(txn.hash),
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

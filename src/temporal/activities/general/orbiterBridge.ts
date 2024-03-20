import { Blockchains } from '@/src/config/Blockchains';
import { Wallet } from 'ethers';
import { connectDB, disconnectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import assert from 'assert';
import BigNumber from 'bignumber.js';
import { getAmounts } from './helpers/Orbiter/getAmounts';
import OrbiterCrossChainRouters_TESTNET from '@/src/config/OrbiterCrossChainRouters_TESTNET';
import OrbiterCrossChainRouters_MAINNET from '@/src/config/OrbiterCrossChainRouters_MAINNET';
import { getRpcProviderForChainId } from '../../clients/rpcProviders/getRpcProviderForChainId';
import { ChainIds } from '@/src/config/Blockchains';
import { BlockchainExplorerUrls } from '@/src/config/BlockchainExplorerUrls';
import { IOrbiterBridgeInput } from '@/src/ts/interfaces/actions/activities/general/orbiterBridge';

export async function GENERAL_orbiterBridge(args: IOrbiterBridgeInput): Promise<any> {
  await connectDB();
  const doc = await FlowModel.findById(args.flowId);

  let crossChainRouter;

  if (args.orbiterEnv === 'TESTNET') {
    crossChainRouter = OrbiterCrossChainRouters_TESTNET.result.find(
      (i: any) =>
        i.srcChain === args.sourceChain.id &&
        i.tgtChain === args.targetChain.id &&
        i.srcToken === args.sourceTokenAddress &&
        i.tgtToken === args.targetTokenAddress
    );
  } else if (args.orbiterEnv === 'MAINNET') {
    crossChainRouter = OrbiterCrossChainRouters_MAINNET.result.find(
      (i: any) =>
        i.srcChain === args.sourceChain.id &&
        i.tgtChain === args.targetChain.id &&
        i.srcToken === args.sourceTokenAddress &&
        i.tgtToken === args.targetTokenAddress
    );
  } else {
    throw 'UNSUPPORTED ORBITER ENVIRONMENT';
  }

  assert(crossChainRouter, 'No crossChainRouter found');

  const { jsonRpcProvider } = await getRpcProviderForChainId(crossChainRouter.srcChain as ChainIds);
  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);

  const balance = await jsonRpcProvider?.getBalance(args.account);
  assert(balance ? balance > BigInt('0') : false, 'no ETH'); // Check the account has funds

  const amountOfBalanceToBridge = BigNumber(balance.toString())
    .multipliedBy(args.percentageToBridge / 100)
    .toFixed(0);

  const { payAmount, receiveAmount } = getAmounts(crossChainRouter, amountOfBalanceToBridge, false); // Check amountOfBalanceToBridge is valid
  const final_amount = payAmount.toString().slice(0, -4) + crossChainRouter['vc']; // IMPORTANT

  const feeData = await jsonRpcProvider?.getFeeData();
  assert(feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas, 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER');

  const txn = await signer.sendTransaction({
    from: signer.address,
    value: BigInt(final_amount),
    to: crossChainRouter.endpoint,
    maxFeePerGas: feeData?.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  });

  const metadata = {
    isTxn: true,
    sourceChain: crossChainRouter.srcChain,
    sourceToken: crossChainRouter.srcToken,
    targetChain: crossChainRouter.tgtChain,
    targetToken: crossChainRouter.tgtToken,
    balance,
    payAmount,
    payAmountWithTargetNetworkId: final_amount,
    receiveAmountOnTarget: receiveAmount,
    amountOfBalanceToBridge,
    txnHash: txn.hash,
    crossChainRouter,
    explorerLink1: BlockchainExplorerUrls[args.sourceChain.id].viewTxn(txn.hash),
    explorerLink2: BlockchainExplorerUrls[args.targetChain.id].viewAccount(args.account),
  };

  // await FlowModel.updateOne(
  //   { _id: args.flowId },
  //   {
  //     $set: {
  //       [`state.actionLog.${args.actionUuid}`]: {
  //         name: args.actionName,
  //         metadata,
  //       },
  //     },
  //   }
  // );

  // await disconnectDB();

  // return metadata;
  return {};
}

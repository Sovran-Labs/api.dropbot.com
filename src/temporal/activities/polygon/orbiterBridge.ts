import { Blockchains } from '@/src/config/Blockchains';
import { Contract, Wallet } from 'ethers';
import { connectDB, disconnectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import assert from 'assert';
import BigNumber from 'bignumber.js';
import { getAmounts } from './Orbiter/getAmounts';
import OrbiterCrossChainRouters_TESTNET from '@/src/config/OrbiterCrossChainRouters_TESTNET';
import OrbiterCrossChainRouters_MAINNET from '@/src/config/OrbiterCrossChainRouters_MAINNET';
import { getRpcProviderForChainId } from '../../clients/rpcProviders/getRpcProviderForChainId';
import { ChainIds } from '@/src/config/Blockchains';
import { BlockchainExplorerUrls } from '@/src/config/BlockchainExplorerUrls';
// import { IOrbiterBridgeInput } from '@/src/ts/interfaces/actions/activities/general/orbiterBridge';
import WETH9_ABI from '@/src/abis/weth9';

export async function POLYGON_orbiterBridge(args: any): Promise<any> {
  await connectDB();
  const doc = await FlowModel.findById(args.flowId);

  let crossChainRouters;

  if (args.orbiterEnv === 'TESTNET') {
    crossChainRouters = OrbiterCrossChainRouters_TESTNET.result.filter(
      (i: any) =>
        i.srcChain === args.sourceChain.id &&
        i.tgtChain === args.targetChain.id &&
        i.srcToken === args.sourceTokenAddress &&
        i.tgtToken === args.targetTokenAddress
    );
  } else if (args.orbiterEnv === 'MAINNET') {
    crossChainRouters = OrbiterCrossChainRouters_MAINNET.result.filter(
      (i: any) =>
        i.srcChain === args.sourceChain.id &&
        i.tgtChain === args.targetChain.id &&
        i.srcToken === args.sourceTokenAddress &&
        i.tgtToken === args.targetTokenAddress
    );
  } else {
    throw 'UNSUPPORTED ORBITER ENVIRONMENT';
  }

  debugger;

  const crossChainRouter = crossChainRouters[0];

  assert(crossChainRouters, 'No crossChainRouter found');

  const { jsonRpcProvider } = await getRpcProviderForChainId(crossChainRouter.srcChain as ChainIds);
  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);

  const balance = await jsonRpcProvider?.getBalance(args.account);
  assert(balance ? balance > BigInt('0') : false, 'no MATIC'); // Check the account has funds

  debugger;

  const tokenA = new Contract(args.sourceTokenAddress, WETH9_ABI, signer);

  debugger;

  const preTokenABalance = await tokenA.balanceOf(args.account);

  debugger;

  // 1000000000000000
  // 4094478089906400n

  const amountOfTokenABalanceToBridge = BigNumber(preTokenABalance.toString())
    .multipliedBy(args.percentageToBridge / 100)
    .toFixed(0);

  console.log('minAmt', crossChainRouter.minAmt);
  console.log('maxAmt', crossChainRouter.maxAmt);

  debugger;

  // 1000000000000000;
  // 0912457959456315;

  const { payAmount, receiveAmount } = getAmounts(crossChainRouter, amountOfTokenABalanceToBridge, false); // Check amountOfBalanceToBridge is valid
  const final_amount = payAmount.toString().slice(0, -4) + crossChainRouter['vc']; // IMPORTANT

  const feeData = await jsonRpcProvider?.getFeeData();
  assert(feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas, 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER');

  // const txn = await signer.sendTransaction({
  //   from: signer.address,
  //   value: BigInt(final_amount),
  //   to: crossChainRouter.endpoint,
  //   maxFeePerGas: feeData?.maxFeePerGas,
  //   maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  // });

  const bridgeTxn = await tokenA.transfer(crossChainRouter.endpoint, final_amount);
  const bridgeTxnReceipt = await bridgeTxn.wait(4);

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
    preTokenABalance,
    amountOfTokenABalanceToBridge,
    txnHash: bridgeTxnReceipt.hash,
    crossChainRouter,
    explorerLink1: BlockchainExplorerUrls[args.sourceChain.id].viewTxn(bridgeTxnReceipt.hash),
    explorerLink2: BlockchainExplorerUrls[args.targetChain.id].viewAccount(args.account),
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

  await disconnectDB();
  return metadata;
}

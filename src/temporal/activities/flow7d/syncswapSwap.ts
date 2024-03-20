/* eslint-disable no-debugger */
import assert from 'assert';
import { ChainIds } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';
import { connectDB } from '@/src/temporal/clients/db';
import { swap } from '@/src/temporal/activities/flow7d/helpers/syncSwap';
import { getRpcProviderForChainId } from '@/src/temporal/clients/rpcProviders/getRpcProviderForChainId';
import { Wallet } from 'ethers';
import axios from 'axios';
import { CycleModel } from '@/src/server/ts/interfaces/cycle';
import seedrandom from 'seedrandom';
import Decimal from 'decimal.js';
import { sleep } from '@/src/scripts/utils/sleep';
import { randomValueInRange } from '@/src/temporal/utils/randomValueInRange';
import { randomBigNumberInRange } from '@/src/temporal/utils/randomBigNumberInRange';

export async function FLOW7d_syncswapSwap(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  tokenAAddress: string;
  tokenBAddress: string;
  tokenA?: any;
  tokenB?: any;
  tokenALowerBound: string;
  tokenAUpperBound: string;
  waitTimeLowerBound: number;
  waitTimeUpperBound: number;
  loopCount: number;
  wAccount: string;
}): Promise<any> {
  try {
    await connectDB(); // each activity needs it's own db connection to be atomic
    const doc = await FlowModel.findById(args.flowId);
    const { jsonRpcProvider } = await getRpcProviderForChainId(ChainIds.ZKSYNC);
    const wAccount = await WalletAccountModel.findOne({ account: args.wAccount });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const signer = new Wallet(wAccount!.pk as string, jsonRpcProvider);

    const swapTxns: any = [];

    const rng: seedrandom.PRNG = seedrandom(args.wAccount);

    for (let i = 0; i < args.loopCount; i++) {
      console.log('performing swap...');
      // const [currentResponse, targetResponse] = await Promise.all([
      //   axios.get(`${process.env.DROPBOT_API_URL}/getUSDTransactionVolume/${args.flowId}`),
      //   axios.get(`${process.env.DROPBOT_API_URL}/getUSDTargetVolume/${args.flowId}`),
      // ]);

      // const usdCurrentAmount = currentResponse.data;
      // const usdTargetAmount = targetResponse.data;

      // console.log('usdCurrentAmount:', usdCurrentAmount);
      // console.log('usdTargetAmount:', usdTargetAmount);

      // console.log('---', await jsonRpcProvider.estimateGas({ to: args.tokenAAddress, value: 0 }));

      console.log('---');
      console.log(args?.tokenA);
      console.log(args?.tokenA?.[0]?.decimals);
      console.log('---');
      console.log(args.tokenALowerBound, args.tokenAUpperBound);
      console.log('---');

      const randomAmount = randomBigNumberInRange(
        args.tokenALowerBound,
        args.tokenAUpperBound,
        args?.tokenA?.[0]?.decimals
      );
      console.log('randomAmount:', randomAmount);
      const swapTx = await swap(
        signer,
        [args.tokenAAddress, args.tokenBAddress],
        randomAmount,
        'MAINNET',
        undefined,
        undefined,
        undefined,
        jsonRpcProvider
      );

      // swapTxns.push(swapTx);

      // await CycleModel.updateOne(
      //   { originalFlowId: args.flowId },
      //   {
      //     $push: {
      //       txnLog: swapTx?.hash,
      //     },
      //   }
      // );

      let transaction;

      console.log();
      console.log('swapTx: ', swapTx);
      console.log();

      // if (swapTx.hash) {
      //   transaction = await signer.provider?.getTransaction(swapTx.hash);
      //   console.log('swapTx.amountIn: ', swapTx.amountIn);
      //   await axios
      //     .patch(`${process.env.DROPBOT_API_URL}/updateUsdTxnVolume/${args.flowId}`, { usdTxnAmount: swapTx.amountIn })
      //     .then((result) => console.log('UsdTxnVolume updated'))
      //     .catch((e) => console.log(e));
      // }

      // if (swapTx.fee) {
      //   await axios
      //     .patch(`${process.env.DROPBOT_API_URL}/updateUsdGasVolume/${args.flowId}`, {
      //       usdCurrentGasSpent: swapTx.fee,
      //     })
      //     .then((result) => console.log('updateUsdGasVolume result: ', result.data.usdCurrentGasSpent))
      //     .catch((e) => console.log(e));
      // }

      const randomWaitTime = randomValueInRange(args.waitTimeLowerBound, args.waitTimeUpperBound);
      await sleep(randomWaitTime * 1000);
    }

    const metadata = {};
    // const metadata = {
    //   swapTxns,
    //   // any info you want to report to temporal or store into the actionLog in Mongo can be placed here
    // };

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
  } catch (e) {
    console.log(e);
  }
}

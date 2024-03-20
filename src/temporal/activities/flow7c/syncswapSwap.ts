/* eslint-disable no-debugger */
import assert from 'assert';
import { ChainIds } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';
import { connectDB } from '@/src/temporal/clients/db';
import { swap } from '@/src/temporal/activities/flow7c/helpers/syncSwap';
import { getRpcProviderForChainId } from '@/src/temporal/clients/rpcProviders/getRpcProviderForChainId';
import { Wallet } from 'ethers';
import axios from 'axios';
import { CycleModel } from '@/src/server/ts/interfaces/cycle';
import { randomizeTokenAAmount } from './helpers/randomizeTokenAAmount';
import * as TokenDetails from '@/src/temporal/activities/flow7c/helpers/config/tokens';

export async function FLOW7c_syncswapSwap(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  tokenAAddress: string;
  tokenBAddress: string;
  tokenA?: any;
  tokenB?: any;
  tokenAAmount: string;
  wAccount: string;
}): Promise<any> {
  try {
    await connectDB(); // each activity needs it's own db connection to be atomic
    const doc = await FlowModel.findById(args.flowId);
    const { jsonRpcProvider } = await getRpcProviderForChainId(ChainIds.ZKSYNC_GOERLI_TESTNET);
    const wAccount = await WalletAccountModel.findOne({ account: args.wAccount });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const signer = new Wallet(wAccount!.pk as string, jsonRpcProvider);

    const swapTxns: any = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log('performing swap...');
      const [currentResponse, targetResponse] = await Promise.all([
        axios.get(`${process.env.DROPBOT_API_URL}/getUSDTransactionVolume/${args.flowId}`),
        axios.get(`${process.env.DROPBOT_API_URL}/getUSDTargetVolume/${args.flowId}`),
      ]);

      const usdCurrentAmount = currentResponse.data;
      const usdTargetAmount = targetResponse.data;

      console.log('usdCurrentAmount:', usdCurrentAmount);
      console.log('usdTargetAmount:', usdTargetAmount);

      if (usdCurrentAmount >= usdTargetAmount) {
        console.log('Congratulations! Txn target reached! Bot has now stopped doing txns!');

        break; // Exit the loop if condition is met
      }

      // call randomizeTokenAAmount
      const tokens = TokenDetails.default.TESTNET;
      debugger;
      const dec = tokens.find((token) => token.address === args.tokenAAddress)?.decimals;
      console.log('dec: ', dec);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const newTokenAAmount = await randomizeTokenAAmount(args.wAccount, args.tokenAAmount, dec! | 6);
      console.log('newTokenAAmount: ', newTokenAAmount);

      const swapTx = await swap(signer, [args.tokenAAddress, args.tokenBAddress], newTokenAAmount, 'TESTNET');

      swapTxns.push(swapTx);

      await CycleModel.updateOne(
        { originalFlowId: args.flowId },
        {
          $push: {
            txnLog: swapTx.hash,
          },
        }
      );

      let transaction;

      if (swapTx.hash) {
        transaction = await signer.provider?.getTransaction(swapTx.hash);
        console.log('swapTx.amountIn: ', swapTx.amountIn);
        await axios
          .patch(`${process.env.DROPBOT_API_URL}/updateUsdTxnVolume/${args.flowId}`, { usdTxnAmount: swapTx.amountIn })
          .then((result) => console.log('UsdTxnVolume updated'))
          .catch((e) => console.log(e));
      }

      if (swapTx.fee) {
        await axios
          .patch(`${process.env.DROPBOT_API_URL}/updateUsdGasVolume/${args.flowId}`, {
            usdCurrentGasSpent: swapTx.fee,
          })
          .then((result) => console.log('updateUsdGasVolume result: ', result.data.usdCurrentGasSpent))
          .catch((e) => console.log(e));
      }
    }

    // Add a delay if needed to avoid flooding the server with requests
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

    const metadata = {
      swapTxns,
      // any info you want to report to temporal or store into the actionLog in Mongo can be placed here
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
  } catch (e) {
    console.log(e);
  }
}

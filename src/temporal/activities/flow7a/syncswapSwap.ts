import assert from 'assert';
import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { swap } from '@/src/temporal/activities/flow7a/helpers/syncSwap';
import { Wallet } from 'ethers';
import { getRpcProviderForChainId } from '@/src/temporal/clients/rpcProviders/getRpcProviderForChainId';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export async function FLOW7a_syncswapSwap(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB(); // each activity needs it's own db connection to be atomic

  // WRITE ACTION LOGIC HERE
  const doc = await FlowModel.findById(args.flowId);
  const { jsonRpcProvider } = await getRpcProviderForChainId(ChainIds.ZKSYNC_GOERLI_TESTNET);
  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);

  const swapTx = await swap(
    signer,
    ['0x0000000000000000000000000000000000000000', '0x0faF6df7054946141266420b43783387A78d82A9'],
    '0.001',
    'TESTNET'
  );

  const metadata = {
    swapTx,
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
}

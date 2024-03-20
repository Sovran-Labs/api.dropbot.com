import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { zksyncSepoliaRpcProvider } from '@/src/temporal/clients/rpcProviders/zksyncSepoliaRpcProvider';

export async function FLOW7c_presequenceCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB(); // each activity needs it's own db connection to be atomic

  const { jsonRpcProvider } = await zksyncSepoliaRpcProvider();
  const blockNumber = await jsonRpcProvider?.getBlockNumber();
  const ethBalance = await jsonRpcProvider?.getBalance(args.account);

  assert(ethBalance ? ethBalance > BigInt('0') : false, 'no ETH '); // Check that the account has funds (native gas)

  const metadata = {
    blockNumber,
    ethBalance: ethBalance.toString(),
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

import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { ethereumSepoliaRpcProvider } from '@/src/temporal/clients/rpcProviders/ethereumSepoliaRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';

export async function SEPOLIA_preCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB();

  const { jsonRpcProvider } = await ethereumSepoliaRpcProvider();
  const blockNumber = await jsonRpcProvider?.getBlockNumber();
  const balance = await jsonRpcProvider?.getBalance(args.account);
  const accountTxnCount = await jsonRpcProvider?.getTransactionCount(args.account);

  assert(balance ? balance > BigInt('0') : false, 'no ETH '); // Check that the account has funds

  const metadata = {
    blockNumber,
    balance: balance.toString(),
    accountTxnCount,
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

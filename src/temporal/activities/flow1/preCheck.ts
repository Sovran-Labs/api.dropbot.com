import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';

export async function FLOW_1_preCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB();

  const { jsonRpcProvider } = await polygonMumbaiRpcProvider();
  const blockNumber = await jsonRpcProvider?.getBlockNumber();

  const maticBalance = await jsonRpcProvider?.getBalance(args.account);
  const accountTxnCount = await jsonRpcProvider?.getTransactionCount(args.account);

  assert(maticBalance ? maticBalance > BigInt('0') : false, 'no MATIC '); // Check that the account has funds

  const metadata = {
    blockNumber,
    maticBalance: maticBalance.toString(),
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

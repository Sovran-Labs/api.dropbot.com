/* eslint-disable no-debugger */
import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { polygonRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';

export async function POLYGON_preCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB();

  debugger;

  const { jsonRpcProvider } = await polygonRpcProvider();

  debugger;

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

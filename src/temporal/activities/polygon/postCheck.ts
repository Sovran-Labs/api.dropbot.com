import { Blockchains } from '@/src/config/Blockchains';
import assert from 'assert';
import { polygonRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '../../clients/db';

export async function POLYGON_postCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  preCheckMaticBalance: string;
  wrapInTxnFee: string;
  wrapOutTxnFee: string;
  account: string;
}): Promise<any> {
  await connectDB();

  console.log('args', args);

  const { jsonRpcProvider } = await polygonRpcProvider();
  const blockNumber = await jsonRpcProvider?.getBlockNumber();
  const maticBalance = await jsonRpcProvider?.getBalance(args.account);
  const accountTxnCount = await jsonRpcProvider?.getTransactionCount(args.account);

  assert(maticBalance ? maticBalance > BigInt('0') : false, 'no MATIC '); // Check that the account has funds

  assert(
    BigInt(args.preCheckMaticBalance) - BigInt(maticBalance) > 0,
    `We should have spent ${BigInt(args.preCheckMaticBalance) - BigInt(maticBalance)} MATIC`
  );

  assert(
    BigInt(args.wrapInTxnFee) + BigInt(args.wrapOutTxnFee) > 0,
    `We should have accumulated gas fees: ${BigInt(args.wrapInTxnFee) + BigInt(args.wrapOutTxnFee)} MATIC`
  );

  assert(
    BigInt(args.preCheckMaticBalance) - BigInt(maticBalance) === BigInt(args.wrapInTxnFee) + BigInt(args.wrapOutTxnFee),
    `Left: ${BigInt(args.preCheckMaticBalance) - BigInt(maticBalance)} right: ${
      BigInt(args.wrapInTxnFee) + BigInt(args.wrapOutTxnFee)
    }`
  );

  const metadata = {
    blockNumber,
    maticBalance: maticBalance.toString(),
    accountTxnCount,
    accumulatedTxnFeesForSequence: BigInt(args.wrapInTxnFee) + BigInt(args.wrapOutTxnFee),
    preCheckBalanceMinusPostCheckBalance: BigInt(args.preCheckMaticBalance) - BigInt(maticBalance),
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

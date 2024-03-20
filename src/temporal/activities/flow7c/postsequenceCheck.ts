import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { connectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import { zksyncSepoliaRpcProvider } from '@/src/temporal/clients/rpcProviders/zksyncSepoliaRpcProvider';

export async function FLOW7c_postsequenceCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
  preCheckEthBalance: string;
  trxFees: string;
}): Promise<any> {
  await connectDB(); // each activity needs it's own db connection to be atomic

  const { jsonRpcProvider } = await zksyncSepoliaRpcProvider();
  const blockNumber = await jsonRpcProvider?.getBlockNumber();
  const ethBalance = await jsonRpcProvider?.getBalance(args.account);
  const accountTxnCount = await jsonRpcProvider?.getTransactionCount(args.account);

  assert(ethBalance ? ethBalance > BigInt('0') : false, 'no MATIC '); // Check that the account has funds

  assert(
    BigInt(args.preCheckEthBalance) - BigInt(ethBalance) > 0,
    `We should have spent ${BigInt(args.preCheckEthBalance) - BigInt(ethBalance)} MATIC`
  );

  assert(
    BigInt(args.trxFees) + BigInt(args.trxFees) > 0,
    `We should have accumulated gas fees: ${BigInt(args.trxFees) + BigInt(args.trxFees)} MATIC`
  );

  assert(
    BigInt(args.preCheckEthBalance) - BigInt(ethBalance) === BigInt(args.trxFees) + BigInt(args.trxFees),
    `Left: ${BigInt(args.preCheckEthBalance) - BigInt(ethBalance)} right: ${
      BigInt(args.trxFees) + BigInt(args.trxFees)
    }`
  );

  const metadata = {
    blockNumber,
    ethBalance: ethBalance.toString(),
    accountTxnCount,
    accumulatedTxnFeesForSequence: BigInt(args.trxFees) + BigInt(args.trxFees),
    preCheckBalanceMinusPostCheckBalance: BigInt(args.preCheckEthBalance) - BigInt(ethBalance),
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

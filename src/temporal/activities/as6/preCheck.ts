import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';

export async function AS6_preCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB();

  const metadata = {
    // houdiniAmount1: {
    //   amount: '40',
    //   unit: 'MATIC',
    //   precisionMultiplier: 0,
    // },
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

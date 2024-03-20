import assert from 'assert';
import { Blockchains } from '@/src/config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';

export async function FLOW7b_postsequenceCheck(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  balances: any;
}): Promise<any> {
  await connectDB(); // each activity needs it's own db connection to be atomic

  // WRITE ACTION LOGIC HERE

  const metadata = {
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

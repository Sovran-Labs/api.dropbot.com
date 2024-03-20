import { connectDB } from '@/src/temporal//clients/db';
import { sleep } from '@/src/scripts/utils/sleep';
import { Blockchains } from '@/src/config/Blockchains';
import { zksyncRpcProvider } from '@/src/temporal/clients/rpcProviders/zksyncRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';

export async function FLOW7d_awaitBlocks(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  amountOfBlocks: number;
}) {
  await connectDB();
  const { jsonRpcProvider } = await zksyncRpcProvider();

  const blockA = await jsonRpcProvider?.getBlockNumber();
  let blockB = blockA;

  while (blockB - blockA < args.amountOfBlocks) {
    await sleep(4000);

    blockB = await jsonRpcProvider?.getBlockNumber();
  }

  const metadata = {
    amountOfBlocks: args.amountOfBlocks,
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

  return {};
}

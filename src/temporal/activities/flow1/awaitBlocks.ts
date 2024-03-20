import { polygonMumbaiRpcProvider } from '../../clients/rpcProviders/polygonMumbaiRpcProvider';
import { connectDB } from '../../clients/db';
import { Blockchains } from '../../../config/Blockchains';
import { FlowModel } from '@/src/server/models/flow/flow';
import { sleep } from '@/src/scripts/utils/sleep';

export async function FLOW_1_awaitBlocks(args: {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  amountOfBlocks: number;
}) {
  await connectDB();
  const { jsonRpcProvider } = await polygonMumbaiRpcProvider();

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

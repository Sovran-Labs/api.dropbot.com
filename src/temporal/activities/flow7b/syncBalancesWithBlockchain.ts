import { Blockchains } from '@/src/config/Blockchains';
import { connectDB, disconnectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import { zksyncRpcProvider } from '../../clients/rpcProviders/zksyncRpcProvider';

export const FLOW7b_syncBalancesWithBlockchain = async (args: {
  flowId: string;
  actionUuid: string;
  account: string;
}) => {
  const db = await connectDB();

  const { jsonRpcProvider } = await zksyncRpcProvider();

  const rpcEthBalance = await jsonRpcProvider?.getBalance(args.account);

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.global.balances.${Blockchains.ZKSYNC}`]: {
          ETH: rpcEthBalance.toString(),
        },
      },
    }
  );
  await disconnectDB();

  return {
    balances: {
      [`${Blockchains.ZKSYNC}`]: {
        ETH: rpcEthBalance.toString(),
      },
    },
  };
};

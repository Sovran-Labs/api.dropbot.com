import { Blockchains } from '@/src/config/Blockchains';
import { connectDB, disconnectDB } from '@/src/temporal/clients/db';
import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';

export const GENERAL_syncBalancesWithBlockchain = async (args: {
  flowId: string;
  actionUuid: string;
  account: string;
  blockchains: string[];
}) => {
  const db = await connectDB();

  // const { jsonRpcProvider } = await polygonMumbaiRpcProvider();

  // const rpcMaticBalance = await jsonRpcProvider?.getBalance(args.account);

  const metadata = {
    // MATIC: rpcMaticBalance.toString(),
  };

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.global.balances.${Blockchains.POLYGON_MUMBAI}`]: metadata,
      },
    }
  );

  await disconnectDB();

  return {
    balances: {
      [`${Blockchains.POLYGON_MUMBAI}`]: metadata,
    },
  };
};

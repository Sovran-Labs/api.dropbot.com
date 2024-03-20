import { Blockchains } from '@/src/config/Blockchains';
import { connectDB, disconnectDB } from '@/src/temporal/clients/db';
import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { FlowModel } from '@/src/server/models/flow/flow';
import { zksyncSepoliaRpcProvider } from '../../clients/rpcProviders/zksyncSepoliaRpcProvider';

export const FLOW7a_syncBalancesWithBlockchain = async (args: {
  flowId: string;
  actionUuid: string;
  account: string;
}) => {
  const db = await connectDB();

  const { jsonRpcProvider } = await zksyncSepoliaRpcProvider();

  const rpcSepoliaEthBalance = await jsonRpcProvider?.getBalance(args.account);

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.global.balances.${Blockchains.ZKSYNC_SEPOLIA_TESTNET}`]: {
          SEPOLIA_ETH: rpcSepoliaEthBalance.toString(),
        },
      },
    }
  );
  await disconnectDB();

  return {
    balances: {
      [`${Blockchains.ZKSYNC_SEPOLIA_TESTNET}`]: {
        SEPOLIA_ETH: rpcSepoliaEthBalance.toString(),
      },
    },
  };
};

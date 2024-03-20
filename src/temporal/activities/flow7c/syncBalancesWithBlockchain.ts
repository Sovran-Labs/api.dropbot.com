import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { connectDB, disconnectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import { getRpcProviderForChainId } from '../../clients/rpcProviders/getRpcProviderForChainId';
import { assert } from 'console';

export const FLOW7c_syncBalancesWithBlockchain = async (args: {
  flowId: string;
  actionUuid: string;
  wAccount: string;
}) => {
  const db = await connectDB();

  const { jsonRpcProvider } = await getRpcProviderForChainId(ChainIds.ZKSYNC_GOERLI_TESTNET);

  const rpcEthBalance = await jsonRpcProvider?.getBalance(args.wAccount);

  assert(rpcEthBalance > 0, 'balance is zero');

  const metadata = {
    ETH: rpcEthBalance.toString(),
  };

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.global.balances.${Blockchains.ZKSYNC_GOERLI_TESTNET}`]: metadata,
      },
    }
  );
  await disconnectDB();

  return {
    balances: {
      [`${Blockchains.ZKSYNC_GOERLI_TESTNET}`]: metadata,
    },
  };
};

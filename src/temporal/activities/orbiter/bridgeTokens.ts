/* eslint-disable no-debugger */
import { IBridgeTokens } from '@/src/ts/interfaces/actions/activities/orbiter/bridgeTokens/input';
import { getRpcProviderForChainId } from '@/src/temporal/clients/rpcProviders/getRpcProviderForChainId';
import assert from 'assert';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { Contract, Wallet, ethers } from 'ethers';
import { ChainIds } from '@/src/config/Blockchains';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';
import ERC20_ABI from '@/src/abis/erc20';
import { bridge } from './helpers/orbiter';
import axios from 'axios';

export const ORBITER_bridgeTokens = async (args: IBridgeTokens) => {
  await connectDB();

  const doc = await FlowModel.findById(args.flowId);

  const walletAccount = await WalletAccountModel.findOne({
    account: args.address,
  });

  assert(args.router, 'No crossChainRouter found');

  const { jsonRpcProvider } = await getRpcProviderForChainId(args.router.srcChain as ChainIds);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const signer = new Wallet(walletAccount?.pk!, jsonRpcProvider);

  const balance = await jsonRpcProvider?.getBalance(args.address);
  assert(balance ? balance > BigInt('0') : false, 'no MATIC'); // Check the account has funds

  const chains = await axios.get(`${process.env.DROPBOT_API_URL}/orbiter/getChainsMainnet`);

  const srcChain = chains?.data?.chains?.result?.find((c: any) => c.chainId === args.router.srcChain);
  const srcToken = srcChain?.tokens?.find((t: any) => t.address === args?.router?.srcToken);

  const tgtChain = chains?.data?.chains?.result?.find((c: any) => c.chainId === args.router.tgtChain);
  const tgtToken = tgtChain?.tokens?.find((t: any) => t.address === args?.router?.tgtToken);

  await bridge({
    evmSigner: signer,
    provider: jsonRpcProvider,
    srcChain,
    srcToken,
    tgtChain,
    tgtToken,
    amount: args.amount,
    crossChainRouter: {
      ...args.router,
    },
  });

  const metadata = {};

  //   await FlowModel.updateOne(
  //     { _id: args.flowId },
  //     {
  //       $set: {
  //         [`state.actionLog.${args.actionUuid}`]: {
  //           name: args.actionName,
  //           metadata,
  //         },
  //       },
  //     }
  //   );

  return metadata;
};

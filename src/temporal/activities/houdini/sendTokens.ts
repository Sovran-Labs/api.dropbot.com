/* eslint-disable no-debugger */
import { ISendTokens } from '@/src/ts/interfaces/actions/activities/houdini/sendTokens/input';
import { getRpcProviderForChainId } from '@/src/temporal/clients/rpcProviders/getRpcProviderForChainId';
import assert from 'assert';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { Contract, Wallet, ethers } from 'ethers';
import { ChainIds } from '@/src/config/Blockchains';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';
import ERC20_ABI from '@/src/abis/erc20';

export const HOUDINI_sendTokens = async (args: ISendTokens) => {
  await connectDB();

  debugger;

  const doc = await FlowModel.findById(args.flowId);

  const walletAccount = await WalletAccountModel.findOne({
    account: args.senderAccount,
  });
  const { jsonRpcProvider } = await getRpcProviderForChainId(args.from.chain.toString() as ChainIds);
  const signer = new Wallet(walletAccount?.pk as string, jsonRpcProvider);

  const balance = await jsonRpcProvider?.getBalance(args.senderAccount);
  assert(balance ? balance > BigInt('0') : false, 'no balance'); // Check the account has funds

  let txn: any;

  console.log(
    `\nSending ${args.from.network.name} ${args.amount} ${args.from.displayName} to obfuscation address ${args.exchangeAddress}...`
  );
  console.log(
    `Output tokens expected to be ${args.to.network.name} ${args.quote} ${args.to.displayName} to ${args.addressTo}...`
  );

  if (args.from.address) {
    const Erc20 = new Contract(args.from.address, ERC20_ABI, signer);
    const decimals = await Erc20.decimals();
    const amount = ethers.parseUnits(args.amount.toString(), decimals);

    txn = await Erc20.transfer(args.senderAccount, amount);
  } else {
    const value = ethers.parseEther(args.amount.toString());
    txn = await signer.sendTransaction({ to: args.exchangeAddress, value });
  }

  const receipt = await txn.wait();

  console.log('\nTransaction validated!');
  console.log('hash: ', txn.hash);
  console.log('Fees: ', ethers.formatEther(receipt?.fee ?? '0'), 'ETH');

  const metadata = {
    txnHash: txn ? txn.hash : null,
    args,
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
};

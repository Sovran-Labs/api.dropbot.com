import { TICKER } from '../../config/constant';
import { encode_ext } from '../utils/transfer';
import { is_native_token } from '../utils/transfer';
import { BridgeToken, TxTransferArgs } from '../../types';
import { Contract, JsonRpcProvider, Wallet, ethers } from 'ethers';
import { ERC20_SOL_ABI } from '../../config/constant';

export const evm_transfer = async (txArgs: TxTransferArgs) => {
  await transfer(txArgs);
};

export const transfer = async (txArgs: TxTransferArgs) => {
  let tx, receipt;
  const { evmSigner, token, crossChainRouter, amount } = txArgs;

  if (is_native_token(token.address)) {
    const params = { to: crossChainRouter.endpoint, value: amount };

    tx = await evmSigner.sendTransaction(params);
    receipt = await tx.wait();
  } // it is an erc20
  else {
    const contract = new Contract(token.address, ERC20_SOL_ABI, evmSigner);

    tx = await contract.transfer(crossChainRouter.endpoint, amount);
    receipt = await tx.wait();
  }

  console.log('\nTransfer validated !');
  console.log('hash: ', tx.hash);
};

export const approve_erc20 = async (target: string, token: BridgeToken, amount: bigint, signer: Wallet) => {
  const erc20 = new Contract(token.address, ERC20_SOL_ABI, signer);

  console.log(
    `\nApproving ${target} to spend ${ethers.formatUnits(amount, token.precision)} ${TICKER[token.address]}...`
  );

  // Approve amount + 10%
  const tx = await erc20.approve(target, (amount * BigInt(11)) / BigInt(10));
  const receipt = await tx.wait();

  console.log('\nTransaction valided !');
  console.log('hash: ', tx.hash);
};

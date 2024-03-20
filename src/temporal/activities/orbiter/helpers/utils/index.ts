import chains from '../../config/chains';
import { is_native_token } from './transfer';
import { BridgeToken, ChainType, TxTransferArgs } from '../../types';
import { Contract, JsonRpcProvider, Contract as SolContract, Wallet, ethers } from 'ethers';
import { ERC20_SOL_ABI } from '../../config/constant';

export const get_balance = async (signer: Wallet, provider: JsonRpcProvider, token: any): Promise<string> => {
  let balance: any;

  if (is_native_token(token.address)) {
    balance = await provider.getBalance(signer.address);
    return ethers.formatUnits(balance, token.precision);
  }

  if (!token.isNative) {
    const erc20 = new Contract(token.address, ERC20_SOL_ABI, signer);
    balance = await erc20.balanceOf(signer.address);
  }

  return ethers.formatUnits(balance, token.precision);
};

export const log_routes = (txArgs: TxTransferArgs) => {
  console.log('\nRoutes:');

  // From
  console.log(`\tFrom ${txArgs.fromChain.name}: ${txArgs.evmSigner.address} => ${txArgs.crossChainRouter.endpoint}`);

  // To
  console.log(`\tTo ${txArgs.toChain.name}: ${txArgs.crossChainRouter.endpoint} => ${txArgs.evmSigner.address}`);
};

export const not_enough_balance = (token: BridgeToken, amount: string, balance: string): boolean => {
  return ethers.parseUnits(amount, token.precision) > ethers.parseUnits(balance, token.precision);
};

import 'dotenv/config';

import ethers, { JsonRpcProvider, formatEther, Contract, Wallet, Mnemonic, HDNodeWallet } from 'ethers';

import ERC20_ABI from './abis/erc20';

const MNEMONIC = process.env.MNEMONIC;
const RPC_PROVIDER = process.env.RPC_PROVIDER;
const ADDRESS = process.env.ADDRESS!;
const ERC20_ADDRESS = `0x9c3c9283d3e44854697cd22d3faa240cfb032889`;

async function main() {
  // v Set up a Signer v
  const mnemonic = Mnemonic.fromPhrase(MNEMONIC!);
  const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic);
  const privateKey = hdNodeWallet.privateKey;
  const provider = new JsonRpcProvider(RPC_PROVIDER);
  const signer = new Wallet(privateKey, provider);

  console.log('ADDRESS', ADDRESS);
  const blockNumber = await provider.getBlockNumber();
  const balance = await provider.getBalance(ADDRESS);
  console.log('blockNumber', blockNumber);
  console.log(balance);
  console.log(await provider.getTransactionCount(ADDRESS));
  const erc20 = new Contract(ERC20_ADDRESS, ERC20_ABI, signer);
  const erc20Balance = await erc20.balanceOf(ADDRESS);
  console.log('erc20Balance', erc20Balance);
}

main();

import 'dotenv/config';
import { Contract, HDNodeWallet, JsonRpcProvider, Mnemonic, Wallet, parseUnits } from 'ethers';
import WETH9_ABI from './abis/weth9';
import { sleep } from '@temporalio/workflow';

const RPC_PROVIDER = process.env.RPC_PROVIDER;
const MNEMONIC = process.env.MNEMONIC!;
const WRAPPED_NATIVE_TOKEN_ADDRESS = `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889`;

async function main() {
  const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
  const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic);
  const privateKey = hdNodeWallet.privateKey;
  const provider = new JsonRpcProvider(RPC_PROVIDER);
  const feeData = await provider.getFeeData();
  const signer = new Wallet(privateKey, provider);

  let balance = await provider.getBalance(signer.address);

  // WMATIC
  const wmatic = new Contract(WRAPPED_NATIVE_TOKEN_ADDRESS, WETH9_ABI, signer);

  let maticBalance;
  let wmaticBalance;
  maticBalance = await signer.provider?.getBalance(signer.address);
  wmaticBalance = await wmatic.balanceOf(signer.address);

  console.log('BEFORE');
  console.log('maticBalance', maticBalance);
  console.log('wmaticBalance', wmaticBalance);

  await wmatic.withdraw(wmaticBalance);

  sleep(10000);

  maticBalance = await signer.provider?.getBalance(signer.address);
  wmaticBalance = await wmatic.balanceOf(signer.address);

  console.log('AFTER');
  console.log('maticBalance', maticBalance);
  console.log('wmaticBalance', wmaticBalance);

  //   balance = await provider.getBalance(signer.address);
  //   console.log('balance AFTER', balance);
}

main();

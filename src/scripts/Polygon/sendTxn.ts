import 'dotenv/config';
import { HDNodeWallet, JsonRpcProvider, Mnemonic, Wallet, parseUnits } from 'ethers';

const RPC_PROVIDER = process.env.RPC_PROVIDER;
const ADDRESS = process.env.ADDRESS!;
const TO_ADDRESS = process.env.TO_ADDRESS;
const MNEMONIC = process.env.MNEMONIC!;

async function main() {
  const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
  const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic);
  const privateKey = hdNodeWallet.privateKey;
  const provider = new JsonRpcProvider(RPC_PROVIDER);
  const feeData = await provider.getFeeData();
  const signer = new Wallet(privateKey, provider);

  let balance = await provider.getBalance(ADDRESS);
  console.log('balance BEFORE', balance);
  await signer.sendTransaction({
    from: ADDRESS,
    to: TO_ADDRESS,
    value: parseUnits('0.0001', 'ether'),
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  });
  balance = await provider.getBalance(ADDRESS);
  console.log('balance AFTER', balance);
}

main();

import 'dotenv/config';
import { HDNodeWallet, JsonRpcProvider, Mnemonic, Wallet, parseUnits } from 'ethers';

const RPC_PROVIDER = process.env.RPC_PROVIDER;
const MNEMONIC = process.env.MNEMONIC!;
const WRAPPED_NATIVE_TOKEN_ADDRESS = `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889`;

async function main() {
  const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
  const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic); // add path if needed.
  const privateKey = hdNodeWallet.privateKey;
  const provider = new JsonRpcProvider(RPC_PROVIDER);
  const feeData = await provider.getFeeData();
  const signer = new Wallet(privateKey, provider);

  let balance = await provider.getBalance(signer.address);
  console.log('balance BEFORE', balance);
  await signer.sendTransaction({
    from: signer.address,
    to: WRAPPED_NATIVE_TOKEN_ADDRESS,
    value: parseUnits('0.0001', 'ether'), // relative units for x% of the balance.
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  });
  balance = await provider.getBalance(signer.address);
  // wait a while then do check as ledger not been updated yet. (5 - 10 seconds).
  console.log('balance AFTER', balance);
}

main();

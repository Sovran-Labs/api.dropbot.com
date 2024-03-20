import { HDNodeWallet, Mnemonic } from 'ethers';

function main() {
  console.log('deriving private key from mnemonic...');

  const mnemonic = Mnemonic.fromPhrase(process.env.MNEMONIC!);
  const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic, ''); // add path if needed
  const privateKey = hdNodeWallet.privateKey;

  console.log('hdNodeWallet', hdNodeWallet);
  console.log('privateKey', privateKey);
}

main();

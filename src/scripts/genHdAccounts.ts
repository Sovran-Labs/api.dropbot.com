import { Wallet, HDNodeWallet, Mnemonic } from 'ethers';
import fs from 'fs';

const ARTIFACTS_FOLDER = 'artifacts';

function main() {
  console.log('generating HD wallet and child accounts with Ethers.js...');
  let hdAccounts: {
    mnemonic: string;
    accounts: { publicKey: string; address: string; path: string }[];
  };
  const wallet = Wallet.createRandom();
  let account1 = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(wallet?.mnemonic?.phrase!), "m/44'/60'/0'/0/0");
  let account2 = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(wallet?.mnemonic?.phrase!), "m/44'/60'/0'/0/1");
  let account3 = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(wallet?.mnemonic?.phrase!), "m/44'/60'/0'/0/2");
  let account4 = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(wallet?.mnemonic?.phrase!), "m/44'/60'/0'/0/3");
  hdAccounts = {
    mnemonic: wallet?.mnemonic?.phrase!,
    accounts: [
      {
        address: account1.address,
        publicKey: account1.publicKey,
        path: account1.path!,
      },
      {
        address: account2.address,
        publicKey: account2.publicKey,
        path: account2.path!,
      },
      {
        address: account3.address,
        publicKey: account3.publicKey,
        path: account3.path!,
      },
      {
        address: account4.address,
        publicKey: account4.publicKey,
        path: account4.path!,
      },
    ],
  };
  fs.writeFileSync(`${ARTIFACTS_FOLDER}/hdAccountsForRoute.json`, JSON.stringify(hdAccounts));
}

main();

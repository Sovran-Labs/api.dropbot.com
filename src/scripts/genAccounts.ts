// import { Wallet } from 'ethers';
// import fs from 'fs';
// import crypto from 'crypto';

// const AMOUNTS_OF_WALLETS = 4;
// const ARTIFACTS_FOLDER = 'artifacts';

// function main() {
//   console.log('generating wallets with Ethers.js...');
//   let accounts: {
//     address: string;
//     privateKey: string;
//   }[] = [];
//   for (let i = 0; i < AMOUNTS_OF_WALLETS; i++) {
//     let id = crypto.randomBytes(32).toString('hex');
//     let privateKey = '0x' + id;
//     let wallet = new Wallet(privateKey);
//     accounts.push({
//       address: wallet.address,
//       privateKey: privateKey,
//     });
//   }
//   fs.writeFileSync(`${ARTIFACTS_FOLDER}/accountsForRoute.json`, JSON.stringify(accounts));
// }

// main();

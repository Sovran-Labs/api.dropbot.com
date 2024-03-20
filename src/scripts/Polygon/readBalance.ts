import ethers, { JsonRpcProvider, formatEther } from 'ethers';

const PROVIDER = process.env.RPC_PROVIDER;
// const ADDRESS = process.env.ADDRESS!;
const ADDRESS = ``;

async function main() {
  console.log('ADDRESS', ADDRESS);
  const provider = new JsonRpcProvider(PROVIDER);
  const blockNumber = await provider.getBlockNumber();
  const balance = await provider.getBalance(ADDRESS);
  console.log('blockNumber', blockNumber);
  console.log(balance);
  console.log(await provider.getTransactionCount(ADDRESS));
}

void main();

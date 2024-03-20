import 'dotenv/config';

import { Wallet, Contract, HDNodeWallet, Mnemonic, JsonRpcProvider } from 'ethers';
import { V2_FACTORY_ABI, V2_PAIR_ABI, MUMBAI_V2_FACTORY, ERC20_ABI } from './constants';

const RPC_PROVIDER = process.env.RPC_PROVIDER;
const MNEMONIC = process.env.MNEMONIC!;

async function main() {
  try {
    console.log('Retrieving liquidity pair...');

    // v Set up a Signer v
    const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
    const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic);
    const privateKey = hdNodeWallet.privateKey;
    const provider = new JsonRpcProvider(RPC_PROVIDER);
    const signer = new Wallet(privateKey, provider);

    // v Instantiate a UniswapV2 Factory on Polygon Mumbai Testnet v
    const Factory = new Contract(MUMBAI_V2_FACTORY, V2_FACTORY_ABI, signer);
    const length = await Factory.allPairsLength();
    console.log('total amount of pairs:', length);

    const liquidityPair = '0xf3963A1f3a5f2a484a430A8aA9420B1a2369c2be';

    // const liquidityPair = await Factory.getPair(
    //   '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
    //   '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747'
    // );

    // console.log('liquidityPair ->', liquidityPair);

    // const PairContract = new Contract(liquidityPair, V2_PAIR_ABI, signer);
    // const token0 = await PairContract.token0();
    // const token1 = await PairContract.token1();
    // console.log('token0 according to PairContract', token0);
    // console.log('token1 according to PairContract', token1);

    // Get the 1st recorded pair
    // const liquidityPair = await Factory.allPairs(0);
    // console.log('liquidityPair address in Factory ->', liquidityPair);

    // Instantiate a UniswapV2 Pair contract
    const PairContract = new Contract(liquidityPair, V2_PAIR_ABI, signer);
    const token0 = await PairContract.token0();
    const token1 = await PairContract.token1();
    console.log('token0 according to PairContract', token0);
    console.log('token1 according to PairContract', token1);

    const erc20_0 = new Contract(token0, ERC20_ABI, signer);
    console.log('Name of ERC20_0', await erc20_0.name());
    const erc20_1 = new Contract(token1, ERC20_ABI, signer);
    console.log('Name of ERC20_1', await erc20_1.name());

    // Get reserves in the Pair Contract
    // const { _reserve0, _reserve1 } = await PairContract.getReserves();
    // console.log('_reserve0', _reserve0);
    // console.log('_reserve1', _reserve1);
  } catch (e) {
    console.log(e);
  }
}

main();

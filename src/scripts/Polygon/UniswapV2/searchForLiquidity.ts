import 'dotenv/config';

import { Wallet, Contract, HDNodeWallet, Mnemonic, JsonRpcProvider } from 'ethers';
import { V2_FACTORY_ABI, V2_PAIR_ABI, MUMBAI_V2_FACTORY, ERC20_ABI } from './constants';
import { p } from '../../utils/p';
import { sleep } from '../../utils/sleep';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

const RPC_PROVIDER = process.env.RPC_PROVIDER;
const MNEMONIC = process.env.MNEMONIC!;
const ARTIFACTS_FOLDER = 'artifacts';

async function main() {
  try {
    console.log('Searching for liquidity...');

    console.log('uuidv4()', uuidv4());

    // v Set up a Signer v
    const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
    const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic);
    const privateKey = hdNodeWallet.privateKey;
    const provider = new JsonRpcProvider(RPC_PROVIDER);
    const signer = new Wallet(privateKey, provider);

    // v Instantiate a UniswapV2 Factory on Polygon Mumbai Testnet v
    const Factory = new Contract(MUMBAI_V2_FACTORY, V2_FACTORY_ABI, signer);
    const amountOfPairs = await Factory.allPairsLength();
    console.log('total amount of pairs:', amountOfPairs);

    let matches: any[] = [];

    let counter = 0;
    for (let i = 0; i < amountOfPairs; i++) {
      try {
        // Get the i'th recorded pair
        const liquidityPair = await Factory.allPairs(i);
        await sleep(100);
        console.log(`#${i} liquidityPair in Factory ->`, liquidityPair);

        // Instantiate a UniswapV2 Pair contract
        const PairContract = new Contract(liquidityPair, V2_PAIR_ABI, signer);
        const token0 = await PairContract.token0();
        await sleep(100);
        const token1 = await PairContract.token1();
        await sleep(100);
        p('token0 according to PairContract', token0);
        p('token1 according to PairContract', token1);

        const erc20_0 = new Contract(token0, ERC20_ABI, signer);
        const erc20_0_name = await erc20_0.name();
        await sleep(100);
        p('Name of ERC20_0', erc20_0_name);
        const erc20_1 = new Contract(token1, ERC20_ABI, signer);
        const erc20_1_name = await erc20_1.name();
        await sleep(100);
        p('Name of ERC20_1', erc20_1_name);

        // Get reserves in the Pair Contract
        const { _reserve0, _reserve1 } = await PairContract.getReserves();
        await sleep(100);
        p('_reserve0', _reserve0);
        p('_reserve1', _reserve1);
        p();

        if (
          erc20_0_name.toLowerCase().includes('Polygon') ||
          erc20_1_name.toLowerCase().includes('Polygon')
          // erc20_0_name.toLowerCase().includes('matic') ||
          // erc20_1_name.toLowerCase().includes('matic')
          //   (erc20_0_name.toLowerCase().includes('dai') && erc20_1_name.toLowerCase().includes('matic'))
          //   token0 === '0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97' ||
          //   token1 === '0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97'
        ) {
          matches.push({
            index: i,
            pair: {
              pairContract: liquidityPair,
              token0: erc20_0_name,
              token0Address: token0,
              _reserve0: _reserve0,
              token1: erc20_1_name,
              token1Address: token1,
              _reserve1: _reserve1,
            },
          });
          await sleep(100);
        }
        if (counter > 3000) break;
      } catch (e) {
        console.log('ERROR', e);
      }
      counter++;
    }

    console.log('matches', matches);

    fs.writeFileSync(`${ARTIFACTS_FOLDER}/searchForLiquidityResults_${uuidv4()}.json`, JSON.stringify(matches));
  } catch (e) {
    console.log(e);
  }
}

main();

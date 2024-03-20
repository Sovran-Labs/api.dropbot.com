import 'dotenv/config';

import { Wallet, Contract, HDNodeWallet, Mnemonic, JsonRpcProvider, parseUnits } from 'ethers';
import {
  V2_FACTORY_ABI,
  V2_ROUTER_ABI,
  V2_PAIR_ABI,
  MUMBAI_V2_FACTORY,
  MUMBAI_V2_ROUTER,
  ERC20_ABI,
} from './constants';
import { sleep } from '../../utils/sleep';

const RPC_PROVIDER = process.env.RPC_PROVIDER;
const MNEMONIC = process.env.MNEMONIC!;
const WMATIC_ADDRESS = `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889`;
const SAND_ADDRESS = `0xE03489D4E90b22c59c5e23d45DFd59Fc0dB8a025`;

const logBalance = async (signer: Wallet) => {
  // WMATIC
  const wmatic = new Contract(WMATIC_ADDRESS, ERC20_ABI, signer);
  // SAND
  const sand = new Contract(SAND_ADDRESS, ERC20_ABI, signer);

  let maticBalance;
  let wmaticBalance;
  let sandBalance;
  let balances;
  maticBalance = await signer.provider?.getBalance(signer.address);
  wmaticBalance = await wmatic.balanceOf(signer.address);
  sandBalance = await sand.balanceOf(signer.address);
  balances = {
    maticBalance: maticBalance,
    wmaticBalance: wmaticBalance,
    sandBalance: sandBalance,
  };
  console.log();
  console.log(`${signer.address} balances`, balances);
  console.log();
};

async function main() {
  try {
    console.log('swapTokens...');

    // v Set up a Signer v
    const mnemonic = Mnemonic.fromPhrase(MNEMONIC);
    const hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic);
    const privateKey = hdNodeWallet.privateKey;
    const provider = new JsonRpcProvider(RPC_PROVIDER);
    const signer = new Wallet(privateKey, provider);

    // Test liquidity pairs
    const liquidityPair = `0xf3963A1f3a5f2a484a430A8aA9420B1a2369c2be`; // WMATIC/SAND

    // Instantiate a UniswapV2 Pair contract
    const PairContract = new Contract(liquidityPair, V2_PAIR_ABI, signer);
    const token0 = await PairContract.token0();
    const token1 = await PairContract.token1();
    console.log('--- token0 ---', token0);
    console.log('--- token1 ---', token1);
    const { _reserve0, _reserve1 } = await PairContract.getReserves();
    console.log('_reserve0', _reserve0);
    console.log('_reserve1', _reserve1);
    console.log('--- --- ---');

    console.log();
    console.log('BEFORE');
    logBalance(signer);

    await sleep(1000);

    const UniswapV2Router = new Contract(MUMBAI_V2_ROUTER, V2_ROUTER_ABI, signer);

    console.log('UniswapV2Router.factory()', await UniswapV2Router.factory());
    const amountsOut = await UniswapV2Router.getAmountsOut(parseUnits('0.00000001', 'ether'), [token0, token1]);
    console.log('UniswapV2Router.getAmountsOut(...)', amountsOut);

    const wmatic = new Contract(token0, ERC20_ABI, signer); // WMATIC
    await wmatic.approve(MUMBAI_V2_ROUTER, parseUnits('0.00000001', 'ether'));

    // @ts-ignore
    const tx = await UniswapV2Router.connect(signer).swapExactTokensForTokens(
      amountsOut[0],
      0,
      [token0, token1],
      signer.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        gasLimit: 10000000,
      }
    );
    await tx.wait();

    await sleep(1000);

    console.log();
    console.log('AFTER');
    logBalance(signer);
  } catch (e) {
    console.log('e', e);
  }
}

main();

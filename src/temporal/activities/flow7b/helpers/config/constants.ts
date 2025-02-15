import erc20_abi from '@/src/temporal/activities/flow7b/abis/erc20.json';
import vault from '@/src/temporal/activities/flow7b/abis/vault.json';
import { JsonRpcProvider } from 'ethers';
import router_abi from '@/src/temporal/activities/flow7b/abis/router.json';
import classic_pair_abi from '@/src/temporal/activities/flow7b/abis/classicPool.json';
import stable_pair_abi from '@/src/temporal/activities/flow7b/abis/stablePool.json';
import classic_pair_factory_abi from '@/src/temporal/activities/flow7b/abis/classicPoolFactory.json';
import stable_pair_factory_abi from '@/src/temporal/activities/flow7b/abis/stablePoolFactory.json';

/***********************************|
|            PROVIDERS              |
|__________________________________*/
export const MAINNET_PROVIDER = new JsonRpcProvider('https://mainnet.era.zksync.io');
export const TESTNET_PROVIDER = new JsonRpcProvider('https://zksync-era-testnet.blockpi.network/v1/rpc/public');

/***********************************|
|              ABIS                 |
|__________________________________*/
export const ERC20_ABI = erc20_abi;
export const ROUTER_ABI = router_abi;
export const VAULT_ABI = vault;
export const CLASSIC_POOL_ABI = classic_pair_abi;
export const CLASSIC_POOL_FACTORY_ABI = classic_pair_factory_abi;
export const STABLE_POOL_ABI = stable_pair_abi;
export const STABLE_POOL_FACTORY_ABI = stable_pair_factory_abi;

/***********************************|
|            CONTRACTS              |
|__________________________________*/
export const ROUTER_ADDRESS: { [key: string]: string } = {
  MAINNET: '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295',
  TESTNET: '0xB3b7fCbb8Db37bC6f572634299A58f51622A847e',
};

export const VAULT: { [key: string]: string } = {
  MAINNET: '0x621425a1Ef6abE91058E9712575dcc4258F8d091',
  TESTNET: '0x4Ff94F499E1E69D687f3C3cE2CE93E717a0769F8',
};

export const POOL_MASTER: { [key: string]: string } = {
  MAINNET: '0xbB05918E9B4bA9Fe2c8384d223f0844867909Ffb',
  TESTNET: '0x22E50b84ec0C362427B617dB3e33914E91Bf865a',
};

export const CLASSIC_POOL_FACTORY: { [key: string]: string } = {
  MAINNET: '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb',
  TESTNET: '0xf2FD2bc2fBC12842aAb6FbB8b1159a6a83E72006',
};

export const STABLE_POOL_FACTORY: { [key: string]: string } = {
  MAINNET: '0x5b9f21d407F35b10CbfDDca17D5D84b129356ea3',
  TESTNET: '0xB6a70D6ab2dE494592546B696208aCEeC18D755f',
};

/***********************************|
|              TOKENS               |
|__________________________________*/
export const TOKENS: { [key: string]: any } = {
  MAINNET: {
    eth: '0x0000000000000000000000000000000000000000',
    weth: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    usdc: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    dai: '',
    wbtc: '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011',
    usdt: '0x59ac51Cfb025adCE007D1EC96A21f7c7e3f32330',
  },
  TESTNET: {
    eth: '0x0000000000000000000000000000000000000000',
    weth: '0x20b28B1e4665FFf290650586ad76E977EAb90c5D',
    dai: '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b',
    usdc: '0x0faF6df7054946141266420b43783387A78d82A9',
    usdt: '0xfcEd12dEbc831D3a84931c63687C395837D42c2B',
  },
};

/***********************************|
|              MISC                 |
|__________________________________*/
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CHAIN_ID: { [key: string]: number } = {
  MAINNET: 324,
  TESTNET: 280,
};

export const TICKER: { [key: string]: string } = {
  '0x0000000000000000000000000000000000000000': 'ETH',
  '0x000000000000000000000000000000000000800A': 'ETH',

  '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91': 'WETH',
  '0x20b28B1e4665FFf290650586ad76E977EAb90c5D': 'WETH',

  a: 'wstETH',
  z: 'USDC',
  '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4': 'USDC',
  '0x0faF6df7054946141266420b43783387A78d82A9': 'USDC',

  '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b': 'DAI',
  t: 'DAI',

  '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011': 'wBTC',

  '0x59ac51Cfb025adCE007D1EC96A21f7c7e3f32330': 'USDT',
  '0xfcEd12dEbc831D3a84931c63687C395837D42c2B': 'USDT',

  i: 'LORDS',
};

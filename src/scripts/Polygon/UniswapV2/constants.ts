import erc20_abi from './abis/erc20';
import v2_pair_abi from './abis/v2_pair';
import v2_router_abi from './abis/v2_router';
import v2_factory_abi from './abis/v2_factory';

/***********************************|
|            PROVIDERS              |
|__________________________________*/
export const POLYGON_PROVIDER: { [key: string]: string } = {
  MAINNET: 'https://polygon-mainnet.infura.io/v3/78581dc93b6d43088baba2bb1606d0c8',
  TESTNET: 'https://polygon-mumbai.infura.io/v3/78581dc93b6d43088baba2bb1606d0c8',
};

/***********************************|
|              ABIS                 |
|__________________________________*/
export const ERC20_ABI = erc20_abi;
export const V2_ROUTER_ABI = v2_router_abi;
export const V2_FACTORY_ABI = v2_factory_abi;
export const V2_PAIR_ABI = v2_pair_abi;

/***********************************|
|            CONTRACTS              |
|__________________________________*/
export const MAINNET_V2_ROUTER = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506';
export const MAINNET_V2_FACTORY = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4';

export const MUMBAI_V2_ROUTER = `0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff`; // QUICKSWAP
export const MUMBAI_V2_FACTORY = `0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32`; // QUICKSWAP

// export const MUMBAI_V2_ROUTER = `0xbdd4e5660839a088573191A9889A262c0Efc0983`;
// export const MUMBAI_V2_FACTORY = `0x69004509291F4a4021fA169FafdCFc2d92aD02Aa`;

// 'weth':'0x462C98Cae5AffEED576c98A55dAA922604e2D875',
// 'uniswapFactory':'0x69004509291F4a4021fA169FafdCFc2d92aD02Aa',
// 'uniswapRouter':'0xbdd4e5660839a088573191A9889A262c0Efc0983',

/***********************************|
|              MISC                 |
|__________________________________*/
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const CHAIN_ID: { [key: string]: number } = {
  MAINNET: 137,
  TESTNET: 80001,
};

/***********************************|
|              TOKENS               |
|__________________________________*/
export const TOKENS: { [key: string]: any } = {
  MAINNET: {
    matic: '0x0000000000000000000000000000000000000000',
    wmatic: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    usdc: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    dai: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    usdt: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  TESTNET: {
    matic: '0x0000000000000000000000000000000000000000',
    wmatic: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
    weth: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    dai: '0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253',
    usdc: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
    usdt: '0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832',
  },
};

export const WMATIC: { [key: string | number]: string } = {
  MAINNET: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  TESTNET: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
};

export const TICKER: { [key: string]: string } = {
  '0x0000000000000000000000000000000000000000': 'MATIC',

  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270': 'WMATIC',
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889': 'WMATIC',

  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': 'WETH',
  '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa': 'WETH',

  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': 'USDC',
  '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747': 'USDC',

  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': 'DAI',
  '0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253': 'DAI',

  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': 'USDT',
  '0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832': 'USDT',
};

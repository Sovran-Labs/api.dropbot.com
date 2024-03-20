import IMPORT_SWAP_ROUTER_ABI from './abis/router.json';
// import IMPORT_QUOTER_ABI from './abis/quoter';
import IMPORT_POOL_V3 from './abis/classicPool.json';

export enum FeeAmount {}
//   LOWEST = 100,
//   LOW = 500,
//   MEDIUM = 3000,
//   HIGH = 10000,

export const WETH_CONTRACT_AD = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91';

export const SYNCSWAP_VAULT_CONTRACT_AD = '0x621425a1Ef6abE91058E9712575dcc4258F8d091';

export const POOL_MASTER_CONTRACT_AD = '0xbB05918E9B4bA9Fe2c8384d223f0844867909Ffb';
export const CLASSIC_POOL_FACTORY_CONTRACT_ADDRESS = '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb';
export const STABLE_POOL_FACTORY_CONTRACT_ADDRESS = '0x5b9f21d407f35b10cbfddca17d5d84b129356ea3';

// export const QUOTER_ADDRESS = '';
export const SWAP_ROUTER_CONTARCT_ADDRESS = '0x2da10a1e27bf85cedd8ffb1abbe97e53391c0295';

export const SWAP_ROUTER_ABI = IMPORT_SWAP_ROUTER_ABI;
// export const QUOTER_ABI = IMPORT_QUOTER_ABI;
export const POOL_V3_ABI = IMPORT_POOL_V3;

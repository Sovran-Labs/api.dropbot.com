import IMPORT_SWAP_ROUTER_ABI from '@/src/temporal/activities/flow7c/abis/router.json';
import IMPORT_POOL_V3 from '@/src/temporal/activities/flow7c/abis/classicPool.json';

export enum FeeAmount {}
//   LOWEST = 100,
//   LOW = 500,
//   MEDIUM = 3000,
//   HIGH = 10000,

export const WETH = '0x20b28b1e4665fff290650586ad76e977eab90c5d';

export const SYNCSWAP_VAULT = '0x4ff94f499e1e69d687f3c3ce2ce93e717a0769f8';

export const POOL_MASTER = '0x22e50b84ec0c362427b617db3e33914e91bf865a';
export const CLASSIC_POOL_FACTORY_CONTRACT_ADDRESS = '0xf2fd2bc2fbc12842aab6fbb8b1159a6a83e72006';
export const STABLE_POOL_FACTORY_CONTRACT_ADDRESS = '0xb6a70d6ab2de494592546b696208aceec18d755f';

export const SWAP_ROUTER_ADDRESS = '0xB3b7fCbb8Db37bC6f572634299A58f51622A847e';

export const SWAP_ROUTER_ABI = IMPORT_SWAP_ROUTER_ABI;
export const POOL_V3_ABI = IMPORT_POOL_V3;

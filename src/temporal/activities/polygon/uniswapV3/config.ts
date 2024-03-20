import IMPORT_SWAP_ROUTER_ABI from './abis/swap_router';
import IMPORT_QUOTER_ABI from './abis/quoter';
import IMPORT_POOL_V3 from './abis/pool_v3';

export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

export const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'; // https://polygonscan.com/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#code
export const SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // SOURCE: https://docs.uniswap.org/contracts/v3/reference/deployments
export const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'; // SOURCE: https://docs.uniswap.org/contracts/v3/reference/deployments

export const SWAP_ROUTER_ABI = IMPORT_SWAP_ROUTER_ABI;
export const QUOTER_ABI = IMPORT_QUOTER_ABI;
export const POOL_V3_ABI = IMPORT_POOL_V3;

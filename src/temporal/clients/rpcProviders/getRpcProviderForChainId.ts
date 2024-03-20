import { ChainIds } from '@/src/config/Blockchains';
import { ethereumSepoliaRpcProvider } from './ethereumSepoliaRpcProvider';
import { polygonMumbaiRpcProvider } from './polygonMumbaiRpcProvider';
import { polygonRpcProvider } from './polygonRpcProvider';
import { zksyncRpcProvider } from './zksyncRpcProvider';
import { arbitrumOneRpcProvider } from './arbitrumOneProvider';
import { zksyncSepoliaRpcProvider } from './zksyncSepoliaRpcProvider';
import { polygonZkevmTestnetRpcProvider } from './polygonZkevmTestnetRpcProvider';
import { zksyncGoerliRpcProvider } from './zksyncGoerliRpcProvider';

export async function getRpcProviderForChainId(chainId: ChainIds) {
  switch (chainId) {
    case ChainIds.SEPOLIA:
      return await ethereumSepoliaRpcProvider();

    case ChainIds.POLYGON_MUMBAI:
      return await polygonMumbaiRpcProvider();

    case ChainIds.POLYGON:
      return await polygonRpcProvider();

    case ChainIds.POLYGON_ZKEVM_TESTNET:
      return await polygonZkevmTestnetRpcProvider();

    case ChainIds.ZKSYNC:
      return await zksyncRpcProvider();

    case ChainIds.ZKSYNC_SEPOLIA_TESTNET:
      return await zksyncSepoliaRpcProvider();

    case ChainIds.ZKSYNC_GOERLI_TESTNET:
      return await zksyncGoerliRpcProvider();

    case ChainIds.ARBITRUM_ONE:
      return await arbitrumOneRpcProvider();

    default:
      throw `RPC provider for chain ${chainId} not found`;
  }
}

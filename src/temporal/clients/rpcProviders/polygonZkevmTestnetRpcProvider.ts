import { JsonRpcProvider } from 'ethers';

export async function polygonZkevmTestnetRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.POLYGON_ZKEVM_TESTNET_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

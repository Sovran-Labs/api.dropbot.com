import { JsonRpcProvider } from 'ethers';

export async function zksyncSepoliaRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.ZKSYNC_SEPOLIA_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

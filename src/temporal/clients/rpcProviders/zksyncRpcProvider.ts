import { JsonRpcProvider } from 'ethers';

export async function zksyncRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.ZKSYNC_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

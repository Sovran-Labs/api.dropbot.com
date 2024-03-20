import { JsonRpcProvider } from 'ethers';

export async function polygonRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.POLYGON_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

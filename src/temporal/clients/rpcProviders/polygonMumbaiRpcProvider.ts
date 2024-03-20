import { JsonRpcProvider } from 'ethers';

export async function polygonMumbaiRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.POLYGON_MUMBAI_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

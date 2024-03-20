import { JsonRpcProvider } from 'ethers';

export async function arbitrumOneRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.ARBITRUM_ONE_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

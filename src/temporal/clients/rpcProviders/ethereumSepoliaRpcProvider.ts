import { JsonRpcProvider } from 'ethers';

export async function ethereumSepoliaRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.ETHEREUM_SEPOLIA_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

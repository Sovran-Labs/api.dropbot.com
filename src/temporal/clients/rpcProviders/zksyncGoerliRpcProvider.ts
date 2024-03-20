import { JsonRpcProvider } from 'ethers';

export async function zksyncGoerliRpcProvider(): Promise<{
  jsonRpcProvider: JsonRpcProvider;
}> {
  const provider = new JsonRpcProvider(process.env.ZKSYNC_GOERLI_RPC_PROVIDER);

  return {
    jsonRpcProvider: provider,
  };
}

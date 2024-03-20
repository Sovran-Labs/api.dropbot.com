// import maker1 from '../../config/maker-1';
// import makerTest1 from '../../config/makerTest-1';
import { Contract as SolContract, JsonRpcProvider, Wallet } from 'ethers';
import { CrossChainRouterType, BridgeChain, Chains, BridgeToken, CrossAddressExt } from '../../types';
import { ERC20_SOL_ABI, NETWORK_NAME_TO_ID, NETWORK_NAME_TO_ORBITERID, TICKER } from '../../config/constant';

export const get_chain = (chain: Chains, network: string): BridgeChain => {
  const chain_id = NETWORK_NAME_TO_ORBITERID[network][chain];
  const chain_name = chain;
  const network_id = NETWORK_NAME_TO_ID[network][chain];

  const bridge_chain: BridgeChain = {
    id: chain_id,
    name: chain_name,
    networkId: network_id,
  };

  return bridge_chain;
};

export const get_token = (
  crossChainRouter: CrossChainRouterType,
  chain: Chains,
  provider: JsonRpcProvider,
  srcChain: any,
  srcToken: any,
  srcPrecision: number
): BridgeToken => {
  const contract = new SolContract(crossChainRouter.srcToken, ERC20_SOL_ABI, provider as JsonRpcProvider);

  const bridge_token: BridgeToken = {
    provider,
    chainId: srcChain.id,
    name: srcToken.name,
    precision: srcPrecision,
    address: crossChainRouter.srcToken,
    makerAddress: crossChainRouter.endpoint,
    contract,
  };

  return bridge_token;
};

export const append_network_target = (payAmount: bigint, target: number): bigint => {
  const sliced = payAmount / 10000n;

  const final_amount = sliced * 10000n + BigInt(target);

  return final_amount;
};

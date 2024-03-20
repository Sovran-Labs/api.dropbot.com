import { Wallet } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MarkerType, BridgeChain, Chains, BridgeToken, CrossAddressExt } from '../../types';
export declare const get_chain: (chain: Chains, network: string) => BridgeChain;
export declare const get_token: (maker: MarkerType, chain: Chains, provider: JsonRpcProvider) => BridgeToken;
export declare const resolve_maker: (token: string, fromChain: BridgeChain, toChain: BridgeChain, network: string) => any;
/**
 * @dev If the exit address on the other chain is not the same we need to specify it as cross address
 *
 */
export declare const resolve_cross_address: (evmSigner: Wallet, fromChain: BridgeChain, toChain: BridgeChain) => CrossAddressExt | undefined;
export declare const append_network_target: (payAmount: bigint, target: number) => bigint;
//# sourceMappingURL=bridge.d.ts.map
import { BridgeToken, TxTransferArgs } from '../../types';
import { Wallet } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
export declare const get_balance: (signer: Wallet, token: BridgeToken) => Promise<string>;
/**
 *
 * @param chainId   // Orbiter id
 */
export declare const resolve_provider: (orbiterId: number) => JsonRpcProvider;
export declare const log_routes: (txArgs: TxTransferArgs) => void;
export declare const not_enough_balance: (token: BridgeToken, amount: string, balance: string) => boolean;
//# sourceMappingURL=index.d.ts.map
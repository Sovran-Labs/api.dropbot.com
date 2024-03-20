import { Wallet } from 'ethers';
import { Chains } from '../types';
/**
 * @name swap
 * @param evmSigner     // etherjs Wallet instance
 * @param starkSigner   // starknet Account instance
 * @param token         // Address of token to be swapped
 * @param fromChain     // Source network's name
 * @param toChain       // Destination network's name
 * @param amount        // (optional) Amount to be sent
 * @param max           // (optional) If set to true, will try to bridge all the balance of the signer
 * @param network       // (optional) In testnet or mainnet
 *
 */
export declare const bridge: (swap: {
    evmSigner: Wallet;
    token: string;
    fromChain: Chains;
    toChain: Chains;
    amount?: string;
    max?: boolean;
    network?: 'TESTNET' | 'MAINNET';
}) => Promise<void>;
//# sourceMappingURL=orbiter.d.ts.map
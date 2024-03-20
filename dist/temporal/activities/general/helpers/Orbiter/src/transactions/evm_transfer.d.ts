import { BridgeToken, TxTransferArgs } from '../../types';
import { Wallet } from '@ethersproject/wallet';
export declare const evm_transfer: (txArgs: TxTransferArgs) => Promise<void>;
export declare const transfer: (txArgs: TxTransferArgs) => Promise<void>;
export declare const approve_erc20: (target: string, token: BridgeToken, amount: bigint, signer: Wallet) => Promise<void>;
//# sourceMappingURL=evm_transfer.d.ts.map
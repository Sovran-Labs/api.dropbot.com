import { UUID } from 'mongodb';
import { ICapital } from '../user/user.interface';
import { IFlow } from './flow/flow.interface';
import { TAirdropName, TBlockchainName, TPhaseType, TTokenName } from '@/src/ts/types';
import { ITimestamps } from '@/src/ts/interfaces/timestamps';
export interface IBalances {
    arbitrum: IBlockchainBalances;
    avalanche: IBlockchainBalances;
    base: IBlockchainBalances;
    ethereum: IBlockchainBalances;
    optimism: IBlockchainBalances;
    polygon: IBlockchainBalances;
    zksyncera: IBlockchainBalances;
}
export interface IBlockchainBalances {
    amount: string;
    name: string;
    symbol: string;
    value: string;
}
export interface IGasInfo {
    amount: string;
    value: string;
}
export interface IKeys {
    publicKey: string;
    privateKey: string;
    path: string;
    timestamp: Date;
}
export interface ITemporalConfig {
    namespace: string;
    taskQueue: string;
    worker_id: string;
}
export interface IWalletStatistics {
    gasUsed: {
        byAirdrop: {
            [blockchain: string]: IGasInfo;
        };
        byBlockchain: {
            [blockchain: string]: IGasInfo;
        };
        byProtocol: {
            [blockchain: string]: IGasInfo;
        };
        byActionType: {
            [blockchain: string]: IGasInfo;
        };
    };
    trxCounts: {
        byBlockchain: Record<string, number>;
        byProtocol: Record<string, number>;
        byActionType: Record<string, number>;
    };
    trxVolume: {
        byBlockchain: Record<string, string>;
        byProtocol: Record<string, string>;
        byActionType: Record<string, string>;
    };
}
export interface IWallet {
    _id?: UUID;
    airdrops: TAirdropName[];
    balances: IBalances;
    blockchains: TBlockchainName[];
    capital: ICapital;
    flow: IFlow;
    keys: IKeys;
    ownershipPercentage: string;
    phases: TPhaseType[];
    statistics: IWalletStatistics;
    temporal: ITemporalConfig;
    timestamps: ITimestamps;
    tokens: TTokenName[];
    trxs: string[] | UUID[];
}
//# sourceMappingURL=wallet.interface.d.ts.map
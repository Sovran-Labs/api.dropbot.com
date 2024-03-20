import { TAirdropName, TBlockchainName, TProtocolName } from '@/src/ts/types';
import { IActionSequenceOption } from '../action-sequence-options/action_sequence_option.interface';
export interface IProtocol {
    actions: IActionSequenceOption[];
    name: TProtocolName;
}
export interface ISnapshots {
    estimated: Date;
    confirmed: Date;
}
export interface IQualificationTargets {
    trxCount: string;
    trxUsdVolume: string;
    trxsInConsecutiveMonths: number;
}
export interface IAirdrop {
    blockchains: TBlockchainName[];
    protocols: IProtocol[];
    name: TAirdropName;
    qualifyingTargets: IQualificationTargets;
    snapshots: ISnapshots;
}
//# sourceMappingURL=airdrop.interface.d.ts.map
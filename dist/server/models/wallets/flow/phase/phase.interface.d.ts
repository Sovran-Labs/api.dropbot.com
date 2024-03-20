import { UUID } from 'mongodb';
import { TPhaseType } from '@/src/ts/types';
import { ICycle } from '../cycle/cycle.interface';
export interface IPhase {
    _id?: UUID;
    cycles: ICycle[];
    type: TPhaseType;
}
export interface IPhases {
    warmUp: IPhase;
    airdrop: IPhase;
    coolDown: IPhase;
}
//# sourceMappingURL=phase.interface.d.ts.map
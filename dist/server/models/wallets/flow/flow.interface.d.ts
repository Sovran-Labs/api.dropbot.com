import { UUID } from 'mongodb';
import { IPhases } from './phase/phase.interface';
export interface IFlow {
    _id?: UUID;
    phases: IPhases;
}
//# sourceMappingURL=flow.interface.d.ts.map
import { TBlockchainName } from '../../../../../ts/types';
import { IAction } from '../action/action.interface';
export interface IActionSequence {
    actions: IAction[];
    blockchain: TBlockchainName;
    tags: string[];
}
//# sourceMappingURL=action_sequence.interface.d.ts.map
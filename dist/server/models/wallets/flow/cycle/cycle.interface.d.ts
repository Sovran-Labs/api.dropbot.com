import { UUID } from "mongodb";
import { IActionSequence } from "../action-sequence/action_sequence.interface";
export interface ICycle {
    _id?: UUID;
    sequences: IActionSequence[];
}
//# sourceMappingURL=cycle.interface.d.ts.map
import { IAction } from './action';
import { DummyWallet } from './accounts';
import { RouteOptions } from './route';
export interface BotWorkFlow {
    actions: IAction[];
    dummyWallet: DummyWallet;
    randomNumberArray: number[];
    routeOptions: RouteOptions;
}
//# sourceMappingURL=workflow.d.ts.map
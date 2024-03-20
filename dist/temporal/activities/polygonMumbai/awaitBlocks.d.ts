import { Status } from '@/src/ts/interfaces/status';
import { Blockchains } from '../../../config/Blockchains';
export declare function POLYGON_MUMBAI_awaitBlocks(args: {
    flowId: string;
    blockchain: Blockchains;
    account: string;
    amountOfBlocks: number;
}): Promise<{
    status: Status;
}>;
//# sourceMappingURL=awaitBlocks.d.ts.map
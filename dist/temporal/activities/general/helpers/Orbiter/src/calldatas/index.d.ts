import { BridgeToken, MarkerType } from '../../types';
export declare const get_amounts: (token: BridgeToken, maker: MarkerType, amount: string, max: boolean) => {
    payAmount: bigint;
    receiveAmount: bigint;
};
export declare const get_receive_amount: (inputAmount: string, selectMakerInfo: MarkerType) => bigint;
//# sourceMappingURL=index.d.ts.map
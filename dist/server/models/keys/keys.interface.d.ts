import { ITimestamps } from '@/src/ts/interfaces/timestamps';
export interface Key {
    path: string;
    publicKey: string;
    privateKey: string;
    timestamp: ITimestamps;
}
export interface IMasterKey extends Key {
    mnemonic: string;
}
//# sourceMappingURL=keys.interface.d.ts.map
import { ITimestamps } from '@/src/ts/interfaces/timestamps';
export interface ICapital {
    additional: string;
    initial: string;
    total: string;
}
export interface IUser {
    eoa: string;
    capital: ICapital;
    name: string;
    ownershipPercentage: string;
    timestamps: ITimestamps;
}
//# sourceMappingURL=user.interface.d.ts.map
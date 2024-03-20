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
  createdAt: number;
  lastUpdatedAt: number;
}

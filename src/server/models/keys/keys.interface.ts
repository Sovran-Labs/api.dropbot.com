export interface Key {
  path: string;
  publicKey: string;
  privateKey: string;
  createdAt: number;
  lastUpdatedAt: number;
}

export interface IMasterKey extends Key {
  mnemonic: string;
}

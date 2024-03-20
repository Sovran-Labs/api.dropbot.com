export interface Blockchain {
  chainId: number;
  gasToken: string;
  name: string;
  rpc: string;
  tokens: string[];
  type: string;
}

export interface TokenPrice {
  [key: string]: string;
}

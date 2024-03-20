import { ChainIds } from './Blockchains';

export const BlockchainExplorerUrls: Record<string, any> = {
  [ChainIds.POLYGON]: {
    viewTxn: (txnHash: string) => {
      return `https://polygonscan.com/tx/${txnHash}`;
    },
    viewAccount: (address: string) => {
      return `https://polygonscan.com/address/${address}`;
    },
  },
  [ChainIds.POLYGON_MUMBAI]: {
    viewTxn: (txnHash: string) => {
      return `https://mumbai.polygonscan.com/tx/${txnHash}`;
    },
  },
  [ChainIds.SEPOLIA]: {
    viewTxn: (txnHash: string) => {
      return `https://sepolia.etherscan.io/tx/${txnHash}`;
    },
  },
  [ChainIds.ZKSYNC]: {
    viewTxn: (txnHash: string) => {
      return `https://explorer.zksync.io/tx/${txnHash}`;
    },
    viewAccount: (address: string) => {
      return `https://explorer.zksync.io/address/${address}`;
    },
  },
  [ChainIds.ZKSYNC_SEPOLIA_TESTNET]: {
    viewTxn: (txnHash: string) => {
      return `https://sepolia.explorer.zksync.io/tx/${txnHash}`;
    },
    viewAccount: (address: string) => {
      return `https://sepolia.explorer.zksync.io/address/${address}`;
    },
  },
};

import { JsonRpcProvider, BaseContract as SolContract, BigNumberish, Wallet } from 'ethers';

export type BridgeToken = {
  provider: JsonRpcProvider;
  chainId: number; // The tokens on different chains are different, but the names are the same
  name: string;
  address: string;
  precision: number;
  makerAddress: string;
  contract: SolContract;
  icon?: string;
};

export type BridgeChain = {
  id: number; // Orbiter's chainId
  name: string;
  networkId: number | string;
  icon?: string;
};

export type OrbiterToken = 'ETH' | 'USDC' | 'DAI' | 'USDT';

export type BridgeNetwork = 'Mainnet' | 'Testnet';

export type Maker = {
  makerAddress: string;
  sender: string;
  maxPrice: number;
  minPrice: number;
  tradingFee: number;
  gasFee: number;
  fromPrecision: number;
  toPrecision: number;
  startTime: number;
  endTime: number;
};

// export type MarkerType = {
//   makerAddress: string;
//   sender: string;
//   fromChainId: number;
//   toChainId: number;
//   fromChainName: string;
//   toChainName: string;
//   fromTokenAddress: string;
//   // toTokenAddress: string,
//   tokenName: string;
//   fromPrecision: number;
//   toPrecision: number;
//   maxPrice: string;
//   minPrice: string;
//   tradingFee: string;
//   gasFee: number;
//   startTime: number;
//   endTime: number;
// };

export type CrossChainRouterType = {
  line: string;
  endpoint: string;
  endpointContract: any;
  srcChain: string;
  tgtChain: string;
  srcToken: string;
  tgtToken: string;
  maxAmt: string;
  minAmt: string;
  tradeFee: string;
  withholdingFee: string;
  vc: string;
  state: string;
  compRatio: number;
  spentTime: number;
  //
  // srcChainName: string;
  // srcTokenName: string;
  // srcChainId: number;
  //
  // tgtChainName: string;
  // tgtTokenName: string;
  // tgtChainId: number;
  //
  // srcPrecision: number;
  // tgtPrecision: number;
  //
  // srcTokenAddress: string;
  // tgtTokenAddress: string;
};

export type Chains =
  | 'starknet'
  | 'arbitrum'
  | 'polygon'
  | 'ethereum'
  | 'zksync'
  | 'optimism'
  | 'metis'
  | 'boba'
  | 'zksync2'
  | 'bsc'
  | 'arbitrum_nova'
  | 'polygon_zkevm'
  | 'base'
  | 'linea'
  | 'mantle';

export type ChainType = {
  api: object;
  chainId: string;
  networkId: string;
  internalId: string;
  name: string;
  debug: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
  };
  rpc: Array<string>;
  contracts: string[];
  tokens: Array<object>;
  xvmList: Array<string>;
  infoURL: string;
};

export type TxTransferArgs = {
  evmSigner: Wallet;
  token: BridgeToken;
  amount: string;
  fromChain: BridgeChain;
  toChain: BridgeChain;
  crossChainRouter: CrossChainRouterType;
  network: 'TESTNET' | 'MAINNET';
  defaultGasLimit?: BigNumberish; // For evm, default value is 55000
  fromAddress?: string;
  decimals?: number; // For immutableX, docs: https://docs.x.immutable.com/docs/linktransfer
  symbol?: string; // For immutableX
  memo?: string; // For loopring
  receiverPublicKey?: string; // For dydx, docs: https://docs.dydx.exchange/#create-transfer
  receiverPositionId?: string; // For dydx
  clientIdAddress?: string; // For dydx, default is toAddress
  nonce?: number; // For customize
  maxFee?: BigNumberish;
};

export type CrossAddressExt = {
  type: string;
  value: string;
};

export const CrossAddressExtTypes = {
  '0x01': 'Cross Ethereum Address',
  '0x02': 'Cross Dydx Address',
  '0x03': 'Cross Stark Address',
};

export type ApproveCallData = {
  contractAddress: string;
  entrypoint: string;
  calldata: [string, any];
};

export type CrossTransferCalldata = {
  contractAddress: string;
  entrypoint: string;
  calldata: [string, string, any, string];
};

export type SwapParams = {
  evmSigner: Wallet;
  token: string;
  fromChain: Chains;
  toChain: Chains;

  amount?: string;
  max?: boolean;
  network?: 'TESTNET' | 'MAINNET';
};

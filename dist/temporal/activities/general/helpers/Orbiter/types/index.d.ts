import { JsonRpcProvider } from '@ethersproject/providers';
import { BaseContract as SolContract, BigNumberish, Wallet } from 'ethers';
export type BridgeToken = {
    provider: JsonRpcProvider;
    chainId: number;
    name: string;
    address: string;
    precision: number;
    makerAddress: string;
    contract: SolContract;
    icon?: string;
};
export type BridgeChain = {
    id: number;
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
export type MarkerType = {
    makerAddress: string;
    sender: string;
    fromChainId: number;
    toChainId: number;
    fromChainName: string;
    toChainName: string;
    fromTokenAddress: string;
    tokenName: string;
    fromPrecision: number;
    toPrecision: number;
    maxPrice: string;
    minPrice: string;
    tradingFee: string;
    gasFee: number;
    startTime: number;
    endTime: number;
};
export type Chains = 'arbitrum' | 'polygon' | 'ethereum' | 'zksync' | 'optimism' | 'metis' | 'boba' | 'zksync2' | 'bsc' | 'arbitrum_nova' | 'polygon_zkevm' | 'base' | 'linea' | 'mantle';
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
    amount: bigint;
    fromChain: BridgeChain;
    toChain: BridgeChain;
    maker: MarkerType;
    network: 'TESTNET' | 'MAINNET';
    defaultGasLimit?: BigNumberish;
    fromAddress?: string;
    decimals?: number;
    symbol?: string;
    memo?: string;
    receiverPublicKey?: string;
    receiverPositionId?: string;
    clientIdAddress?: string;
    nonce?: number;
    maxFee?: BigNumberish;
    crossAddressExt?: CrossAddressExt;
};
export type CrossAddressExt = {
    type: string;
    value: string;
};
export declare const CrossAddressExtTypes: {
    '0x01': string;
    '0x02': string;
};
export type ApproveCallData = {
    contractAddress: string;
    entrypoint: string;
    calldata: [string];
};
export type CrossTransferCalldata = {
    contractAddress: string;
    entrypoint: string;
    calldata: [string, string, string];
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
//# sourceMappingURL=index.d.ts.map
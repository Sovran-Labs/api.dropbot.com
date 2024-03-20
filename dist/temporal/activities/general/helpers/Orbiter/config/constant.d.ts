/***********************************|
|            PROVIDERS              |
|__________________________________*/
/***********************************|
|              ABIS                 |
|__________________________________*/
export declare const ERC20_SOL_ABI: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const CROSS_ADDRESS_ABI: {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
}[];
/***********************************|
|            CONTRACTS              |
|__________________________________*/
export declare const CROSS_ADDRESS: {
    [key: string]: string;
};
/***********************************|
|              MISC                 |
|__________________________________*/
export declare const ORBITER_CHAINID_TO_NETWORKID: {
    [key: number]: string;
};
export declare const CHAIN_INDEX: any;
export declare const NETWORK_NAME_TO_ORBITERID: {
    [key: string]: any;
};
export declare const NETWORK_NAME_TO_ID: {
    [key: string]: any;
};
/***********************************|
|              TOKENS               |
|__________________________________*/
export declare const TOKENS: {
    [key: string]: any;
};
export declare const TICKER: {
    [key: string]: string;
};
//# sourceMappingURL=constant.d.ts.map
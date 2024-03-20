declare const _default: ({
    actions: {
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
        };
    }[];
    id: string;
    description: string;
} | {
    actions: ({
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            wrappedNativeTokenAddress?: undefined;
            amount?: undefined;
            duration?: undefined;
            wrapInTxnHash?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            wrappedNativeTokenAddress: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            amount: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                lowerBound: number;
                upperBound: number;
                val?: undefined;
            };
            duration?: undefined;
            wrapInTxnHash?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            duration: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: number;
            };
            account?: undefined;
            balances?: undefined;
            wrappedNativeTokenAddress?: undefined;
            amount?: undefined;
            wrapInTxnHash?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            wrapInTxnHash: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            wrappedNativeTokenAddress: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            amount?: undefined;
            duration?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: import("../GeneralActions").GeneralActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            duration: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: string;
            };
            account?: undefined;
            balances?: undefined;
            wrappedNativeTokenAddress?: undefined;
            amount?: undefined;
            wrapInTxnHash?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            amount: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: number;
                lowerBound?: undefined;
                upperBound?: undefined;
            };
            wrappedNativeTokenAddress: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            duration?: undefined;
            wrapInTxnHash?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            txn1Gas: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            txn3Gas: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            amount: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: number;
                lowerBound?: undefined;
                upperBound?: undefined;
            };
            wrappedNativeTokenAddress: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            blockchain?: undefined;
            duration?: undefined;
            wrapInTxnHash?: undefined;
        };
    })[];
    id: string;
    description: string;
} | {
    actions: ({
        name: import("../PolygonMumbaiActions").PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            account: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            balances: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                key: string;
            };
            sourceChain?: undefined;
            destinationChain?: undefined;
            amount?: undefined;
        };
    } | {
        name: import("../GeneralActions").GeneralActions;
        dependencies: {
            sourceChain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            destinationChain: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                val: import("../Blockchains").Blockchains;
            };
            amount: {
                type: import("../ConfigValueTypes").ConfigValueTypes;
                lowerBound: number;
                upperBound: number;
            };
            blockchain?: undefined;
            account?: undefined;
            balances?: undefined;
        };
    })[];
    id: string;
    description: string;
})[];
export default _default;
//# sourceMappingURL=index.d.ts.map
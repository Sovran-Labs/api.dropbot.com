import { Blockchains } from '../Blockchains';
import { ConfigValueTypes } from '../ConfigValueTypes';
import { GeneralActions } from '../GeneralActions';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';
declare const _default: {
    actions: ({
        name: PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            account: {
                type: ConfigValueTypes;
                key: string;
            };
            balances: {
                type: ConfigValueTypes;
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
        name: PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            account: {
                type: ConfigValueTypes;
                key: string;
            };
            balances: {
                type: ConfigValueTypes;
                key: string;
            };
            wrappedNativeTokenAddress: {
                type: ConfigValueTypes;
                key: string;
            };
            amount: {
                type: ConfigValueTypes;
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
        name: PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            duration: {
                type: ConfigValueTypes;
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
        name: PolygonMumbaiActions;
        dependencies: {
            wrapInTxnHash: {
                type: ConfigValueTypes;
                key: string;
            };
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            account: {
                type: ConfigValueTypes;
                key: string;
            };
            balances: {
                type: ConfigValueTypes;
                key: string;
            };
            wrappedNativeTokenAddress: {
                type: ConfigValueTypes;
                key: string;
            };
            amount?: undefined;
            duration?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: GeneralActions;
        dependencies: {
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            duration: {
                type: ConfigValueTypes;
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
        name: PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            account: {
                type: ConfigValueTypes;
                key: string;
            };
            balances: {
                type: ConfigValueTypes;
                key: string;
            };
            amount: {
                type: ConfigValueTypes;
                val: number;
                lowerBound?: undefined;
                upperBound?: undefined;
            };
            wrappedNativeTokenAddress: {
                type: ConfigValueTypes;
                key: string;
            };
            duration?: undefined;
            wrapInTxnHash?: undefined;
            txn1Gas?: undefined;
            txn3Gas?: undefined;
        };
    } | {
        name: PolygonMumbaiActions;
        dependencies: {
            txn1Gas: {
                type: ConfigValueTypes;
                key: string;
            };
            txn3Gas: {
                type: ConfigValueTypes;
                key: string;
            };
            account: {
                type: ConfigValueTypes;
                key: string;
            };
            balances: {
                type: ConfigValueTypes;
                key: string;
            };
            amount: {
                type: ConfigValueTypes;
                val: number;
                lowerBound?: undefined;
                upperBound?: undefined;
            };
            wrappedNativeTokenAddress: {
                type: ConfigValueTypes;
                key: string;
            };
            blockchain?: undefined;
            duration?: undefined;
            wrapInTxnHash?: undefined;
        };
    })[];
    id: string;
    description: string;
};
export default _default;
//# sourceMappingURL=as1.d.ts.map
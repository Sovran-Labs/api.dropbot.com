"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchains_1 = require("../Blockchains");
const ConfigValueTypes_1 = require("../ConfigValueTypes");
const GeneralActions_1 = require("../GeneralActions");
const PolygonMumbaiActions_1 = require("../PolygonMumbaiActions");
exports.default = {
    actions: [
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.PRE_SEQUENCE_CHECK,
            dependencies: {
                blockchain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                account: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.account',
                },
                balances: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.balances',
                },
            },
        },
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.WRAP_NATIVE_IN,
            dependencies: {
                blockchain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                account: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.account',
                },
                balances: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.balances',
                },
                wrappedNativeTokenAddress: {
                    type: ConfigValueTypes_1.ConfigValueTypes.CONFIG,
                    key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
                },
                amount: {
                    type: ConfigValueTypes_1.ConfigValueTypes.RANGE,
                    lowerBound: 100000000,
                    upperBound: 200000000,
                },
            },
        },
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.AWAIT_BLOCKS,
            dependencies: {
                blockchain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                duration: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: 10,
                },
            },
        },
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.POST_WRAP_NATIVE_IN_CHECK,
            dependencies: {
                wrapInTxnHash: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'log.-2.txnHash',
                },
                blockchain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                account: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.account',
                },
                balances: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.balances',
                },
                wrappedNativeTokenAddress: {
                    type: ConfigValueTypes_1.ConfigValueTypes.CONFIG,
                    key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
                },
            },
        },
        {
            name: GeneralActions_1.GeneralActions.WAIT,
            dependencies: {
                blockchain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                duration: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: '5s',
                },
            },
        },
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.WRAP_NATIVE_OUT,
            dependencies: {
                blockchain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                account: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.account',
                },
                balances: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.balances',
                },
                amount: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: 100,
                },
                wrappedNativeTokenAddress: {
                    type: ConfigValueTypes_1.ConfigValueTypes.CONFIG,
                    key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
                },
            },
        },
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.POST_SEQUENCE_CHECK,
            dependencies: {
                txn1Gas: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'log.-1.gas',
                },
                txn3Gas: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'log.3.gas',
                },
                account: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.account',
                },
                balances: {
                    type: ConfigValueTypes_1.ConfigValueTypes.STATE,
                    key: 'global.balances',
                },
                amount: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: 100,
                },
                wrappedNativeTokenAddress: {
                    type: ConfigValueTypes_1.ConfigValueTypes.CONFIG,
                    key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
                },
            },
        },
    ],
    id: '1',
    description: 'The first action sequence used to test the bot. Implements a simple wrap/unwrap flow on Polygon Mumbai.',
};
//# sourceMappingURL=as1.js.map
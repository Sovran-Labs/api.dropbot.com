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
            name: GeneralActions_1.GeneralActions.ORBITER_BRIDGE,
            dependencies: {
                sourceChain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.POLYGON_MUMBAI,
                },
                destinationChain: {
                    type: ConfigValueTypes_1.ConfigValueTypes.HARDCODED,
                    val: Blockchains_1.Blockchains.ZKSYNCERA_SEPOLIA_TESTNET,
                },
                amount: {
                    type: ConfigValueTypes_1.ConfigValueTypes.RANGE,
                    lowerBound: 1,
                    upperBound: 5,
                },
            },
        },
    ],
    id: '3',
    description: 'An action sequence for testing bridging L1 tokens from Polygon Mumbai to zkSync Sepolia Testnet.',
};
//# sourceMappingURL=as3.js.map
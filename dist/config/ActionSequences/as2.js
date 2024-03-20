"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchains_1 = require("../Blockchains");
const ConfigValueTypes_1 = require("../ConfigValueTypes");
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
            },
        },
        {
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.PRE_UNISWAP_V2_CHECK,
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
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.UNISWAP_V2_SWAP,
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
            name: PolygonMumbaiActions_1.PolygonMumbaiActions.UNISWAP_V2_SWAP,
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
            },
        },
        // {
        //   name: PolygonMumbaiActions.PRE_BRIDGE_CHECK,
        //   dependencies: {
        //     blockchain: {
        //       type: ConfigValueTypes.HARDCODED,
        //       val: Blockchains.POLYGON_MUMBAI,
        //     },
        //     account: {
        //       type: ConfigValueTypes.STATE,
        //       key: 'global.account',
        //     },
        //     balances: {
        //       type: ConfigValueTypes.STATE,
        //       key: 'global.balances',
        //     },
        //   },
        // },
        // {
        //   name: GeneralActions.BRIDGE,
        //   dependencies: {
        //     fromBlockchain: {
        //       type: ConfigValueTypes.HARDCODED,
        //       val: Blockchains.POLYGON_MUMBAI,
        //     },
        //     toBlockchain: {
        //       type: ConfigValueTypes.HARDCODED,
        //       val: Blockchains.BASE,
        //     },
        //     balances: {
        //       type: ConfigValueTypes.STATE,
        //       key: 'global.balances',
        //     },
        //   },
        // },
    ],
    id: '2',
    description: 'The 3rd action sequence used to test the bot. Implements a Uniswap V2 swap flow and then bridges to Base.',
};
//# sourceMappingURL=as2.js.map
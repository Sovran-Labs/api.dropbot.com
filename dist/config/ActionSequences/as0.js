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
    ],
    id: '0',
    description: 'An action sequence for testing one or two actions at a time.',
};
//# sourceMappingURL=as0.js.map
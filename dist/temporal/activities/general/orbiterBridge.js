"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_orbiterBridge = void 0;
const status_1 = require("@/src/ts/interfaces/status");
async function GENERAL_orbiterBridge(args) {
    try {
        console.log('___ --- ___');
        console.log('Orbiter bridge started...');
        return {
            status: status_1.Status.SUCCESS,
        };
    }
    catch (e) {
        throw 'bridge error';
    }
}
exports.GENERAL_orbiterBridge = GENERAL_orbiterBridge;
//# sourceMappingURL=orbiterBridge.js.map
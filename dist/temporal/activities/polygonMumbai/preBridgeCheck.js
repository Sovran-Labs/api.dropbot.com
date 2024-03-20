"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLYGON_MUMBAI_preBridgeCheck = void 0;
const status_1 = require("@/src/ts/interfaces/status");
async function POLYGON_MUMBAI_preBridgeCheck(args) {
    try {
        return {
            status: status_1.Status.SUCCESS,
        };
    }
    catch (e) {
        throw 'error';
    }
}
exports.POLYGON_MUMBAI_preBridgeCheck = POLYGON_MUMBAI_preBridgeCheck;
//# sourceMappingURL=preBridgeCheck.js.map
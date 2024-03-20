"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_wait = void 0;
const status_1 = require("@/src/ts/interfaces/status");
const common_1 = require("@temporalio/common");
async function GENERAL_wait(args) {
    try {
        console.log('___ --- ___');
        console.log('wait started...');
        return {
            status: status_1.Status.SUCCESS,
        };
    }
    catch (e) {
        console.log('***');
        throw new common_1.ApplicationFailure('wait error', '', true);
    }
}
exports.GENERAL_wait = GENERAL_wait;
//# sourceMappingURL=wait.js.map
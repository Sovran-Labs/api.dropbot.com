"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectInfuraJsonRpcProvider = void 0;
const providers_1 = require("@ethersproject/providers");
async function connectInfuraJsonRpcProvider() {
    const provider = new providers_1.JsonRpcProvider(process.env.INFURA_RPC_PROVIDER);
    return {
        jsonRpcProvider: provider,
    };
}
exports.connectInfuraJsonRpcProvider = connectInfuraJsonRpcProvider;
//# sourceMappingURL=infuraRpcProvider.js.map
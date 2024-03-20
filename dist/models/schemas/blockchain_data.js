"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainConfigModel = void 0;
const mongoose_1 = require("mongoose");
// Define a schema for chain configurations
const blockchainConfigSchema = new mongoose_1.Schema({
    chainId: Number,
    gasToken: String,
    name: String,
    rpc: String,
    tokens: [String],
    type: String,
});
// Define a model for the chain configurations
exports.BlockchainConfigModel = (0, mongoose_1.model)('BlockchainConfig', blockchainConfigSchema);
//# sourceMappingURL=blockchain_data.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionModel = void 0;
const mongoose_1 = require("mongoose");
// Define a schema for protocols
const protocolSchema = new mongoose_1.Schema({
    actions: [String],
    name: String,
});
// Define a schema for transactions
const actionSchema = new mongoose_1.Schema({
    blockchain: String,
    protocols: [protocolSchema],
    type: String,
});
// Define a model for the transactions
exports.ActionModel = (0, mongoose_1.model)('Action', actionSchema);
//# sourceMappingURL=actions_data.js.map
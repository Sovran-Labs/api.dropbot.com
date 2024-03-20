"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTypeModel = void 0;
const mongoose_1 = require("mongoose");
// Define a schema for the Action Type
const actionTypeWeightsSchema = new mongoose_1.Schema({
    type: String,
    value: Number,
});
// Define a model for the Action Types
exports.ActionTypeModel = (0, mongoose_1.model)('ActionType', actionTypeWeightsSchema);
//# sourceMappingURL=action_type_weights.js.map
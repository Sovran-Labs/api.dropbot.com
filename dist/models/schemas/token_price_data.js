"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPriceDataModel = void 0;
const mongoose_1 = require("mongoose");
// Define a schema for the token values
const tokenPriceDataSchema = new mongoose_1.Schema({
    avax: Number,
    bnb: Number,
    eth: Number,
    matic: Number,
    dai: Number,
    usdc: Number,
    usdt: Number,
});
// Define a model for the token values
exports.TokenPriceDataModel = (0, mongoose_1.model)('TokenPriceData', tokenPriceDataSchema);
//# sourceMappingURL=token_price_data.js.map
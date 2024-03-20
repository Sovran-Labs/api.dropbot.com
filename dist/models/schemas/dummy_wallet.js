"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define a schema for tokens
const tokenSchema = new mongoose_1.default.Schema({
    name: String,
    amount: String,
    value: String,
});
// Define a schema for blockchain balances
const blockchainBalanceSchema = new mongoose_1.default.Schema({
    blockchainName: String,
    tokens: [tokenSchema],
});
// Define a schema for the signer
const signerSchema = new mongoose_1.default.Schema({
    publicKey: String,
    privateKey: String,
});
// Define a schema for the data
const dummyWalletDataSchema = new mongoose_1.default.Schema({
    balances: [blockchainBalanceSchema],
    chains: [String],
    signer: signerSchema,
    tokens: [String],
});
// Create a Mongoose model for the JSON data
const DummyWalletData = mongoose_1.default.model('DummyWalletData', dummyWalletDataSchema);
module.exports = DummyWalletData;
//# sourceMappingURL=dummy_wallet.js.map
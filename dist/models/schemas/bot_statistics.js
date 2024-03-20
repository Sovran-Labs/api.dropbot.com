"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the MongoDB schema for gas information
const gasInfoSchema = new mongoose_1.default.Schema({
    amount: Number,
    value: Number,
});
// Define the MongoDB schema for gas used by blockchain
const gasUsedByBlockchainSchema = new mongoose_1.default.Schema({
    all: gasInfoSchema,
    legacy: gasInfoSchema,
    airdrop: gasInfoSchema,
    arbitrum: gasInfoSchema,
    avalanche: gasInfoSchema,
    base: gasInfoSchema,
    binance: gasInfoSchema,
    ethereum: gasInfoSchema,
    optimism: gasInfoSchema,
    polygon: gasInfoSchema,
    zksyncera: gasInfoSchema
});
// Define the MongoDB schema for gas used by protocol
const gasUsedByProtocolSchema = new mongoose_1.default.Schema({
    aerodrome: gasInfoSchema,
    baseswapv2: gasInfoSchema,
    baseswapv3: gasInfoSchema,
    houdini: gasInfoSchema,
    izumi: gasInfoSchema,
    mute: gasInfoSchema,
    orbiter: gasInfoSchema,
    pancakeswap: gasInfoSchema,
    scale: gasInfoSchema,
    sushiswap: gasInfoSchema,
    syncswap: gasInfoSchema,
    uniswap: gasInfoSchema
});
// Define the MongoDB schema for gas used by action type
const gasUsedByActionTypeSchema = new mongoose_1.default.Schema({
    addLiquidity: gasInfoSchema,
    bridge: gasInfoSchema,
    obfuscation: gasInfoSchema,
    removeLiquidity: gasInfoSchema,
    swap: gasInfoSchema
});
// Define the MongoDB schema for gas used
const gasUsedSchema = new mongoose_1.default.Schema({
    byActionType: gasUsedByActionTypeSchema,
    byBlockchain: gasUsedByBlockchainSchema,
    byProtocol: gasUsedByProtocolSchema,
});
// Define the MongoDB schema for transaction counts
const trxCountsSchema = new mongoose_1.default.Schema({
    byActionType: Object,
    byBlockchain: Object,
    byProtocol: Object,
});
// Define the MongoDB schema for transaction volume
const trxVolumeSchema = new mongoose_1.default.Schema({
    byBlockchain: Object,
    byProtocol: Object,
    byActionType: Object,
});
// Define the MongoDB schema for the entire data structure
const botStatisticsSchema = new mongoose_1.default.Schema({
    gasUsed: gasUsedSchema,
    trxCounts: trxCountsSchema,
    trxVolume: trxVolumeSchema,
});
// Create a model for your data
const BotStats = mongoose_1.default.model('BotStatistics', botStatisticsSchema);
module.exports = BotStats;
//# sourceMappingURL=bot_statistics.js.map
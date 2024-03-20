"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BlockchainBalances = new mongoose_1.Schema({
    amount: String,
    name: String,
    symbol: String,
    value: String,
});
const BalancesSchema = new mongoose_1.Schema({
    arbitrum: BlockchainBalances,
    avalanche: BlockchainBalances,
    base: BlockchainBalances,
    ethereum: BlockchainBalances,
    optimism: BlockchainBalances,
    polygon: BlockchainBalances,
    zksyncera: BlockchainBalances,
});
const Capital = new mongoose_1.Schema({
    additional: [String],
    initial: [String],
    total: [String],
});
const ActionStatus = new mongoose_1.Schema({
    isCompleted: Boolean,
    hasFailed: Boolean,
    isInProgress: Boolean,
    isNotStarted: Boolean,
});
const Action = new mongoose_1.Schema({
    blockchain: String,
    status: ActionStatus,
    protocol: String,
    phaseType: String,
});
const ActionSequence = new mongoose_1.Schema({
    actions: [Action],
    blockchain: String,
    tags: [String],
});
const Cycle = new mongoose_1.Schema({
    sequences: [ActionSequence],
});
const Phase = new mongoose_1.Schema({
    cycles: [Cycle],
    type: String,
});
const Phases = new mongoose_1.Schema({
    warmUp: Phase,
    airdrop: Phase,
    coolDown: Phase,
});
const Flow = new mongoose_1.Schema({
    phases: Phases,
});
const Keys = new mongoose_1.Schema({
    publicKey: String,
    privateKey: String,
    path: String,
    timestamp: Date,
});
const GasInfo = new mongoose_1.Schema({
    amount: String,
    value: String,
});
const ByAirdrop = new mongoose_1.Schema({
    base: GasInfo,
    zksyncera: GasInfo,
});
const ByBlockchain = new mongoose_1.Schema({
    arbitrum: GasInfo,
    avalanche: GasInfo,
    base: GasInfo,
    ethereum: GasInfo,
    optimism: GasInfo,
    polygon: GasInfo,
    polygonMumbai: GasInfo,
    zksyncera: GasInfo,
});
const ByProtocol = new mongoose_1.Schema({
    aerodrome: GasInfo,
    baseswapv2: GasInfo,
    baseswapv3: GasInfo,
    scale: GasInfo,
    izumi: GasInfo,
    mute: GasInfo,
    syncswap: GasInfo,
});
const ByActionType = new mongoose_1.Schema({
    addLiquidity: GasInfo,
    bridge: GasInfo,
    obfuscate: GasInfo,
    removeLiquidity: GasInfo,
    swap: GasInfo,
});
const WalletStatistics = new mongoose_1.Schema({
    gasUsed: {
        byAirdrop: ByAirdrop,
        byBlockchain: ByBlockchain,
        byProtocol: ByProtocol,
        byActionType: ByActionType,
    },
    trxCounts: {
        byAirdrop: {
            base: Number,
            zksyncera: Number,
        },
        byBlockchain: {
            arbitrum: Number,
            avalanche: Number,
            base: Number,
            ethereum: Number,
            optimism: Number,
            polygon: Number,
            polygonMumbai: Number,
            zksyncera: Number,
        },
        byProtocol: {
            aerodrome: Number,
            baseswapv2: Number,
            baseswapv3: Number,
            scale: Number,
            izumi: Number,
            mute: Number,
            syncswap: Number,
        },
        byActionType: {
            addLiquidity: Number,
            bridge: Number,
            obfuscate: Number,
            removeLiquidity: Number,
            swap: Number,
        },
    },
    trxVolume: {
        byAirdrop: ByAirdrop,
        byBlockchain: ByBlockchain,
        byProtocol: ByProtocol,
        byActionType: ByActionType,
    },
});
const TemporalConfig = new mongoose_1.Schema({
    worker_id: String,
    namespace: String,
    taskQueue: String,
});
const Timestamps = new mongoose_1.Schema({
    createdAt: Date,
    lastUpdatedAt: Date,
});
const WalletSchema = new mongoose_1.Schema({
    airdrops: [String],
    balances: BalancesSchema,
    blockchains: [String],
    capital: Capital,
    flow: Flow,
    keys: Keys,
    ownershipPercentage: String,
    phases: [String],
    statistics: WalletStatistics,
    temporal: TemporalConfig,
    timestamps: Timestamps,
    tokens: [String],
    trxs: [String],
});
const WalletModel = mongoose_1.default.model('Wallet', WalletSchema);
exports.default = WalletModel;
//# sourceMappingURL=wallet.model.js.map
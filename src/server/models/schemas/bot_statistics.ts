import mongoose from 'mongoose';

// Define the MongoDB schema for gas information
const gasInfoSchema = new mongoose.Schema({
  amount: Number,
  value: Number,
});

// Define the MongoDB schema for gas used by blockchain
const gasUsedByBlockchainSchema = new mongoose.Schema({
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
const gasUsedByProtocolSchema = new mongoose.Schema({
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
const gasUsedByActionTypeSchema = new mongoose.Schema({
  addLiquidity: gasInfoSchema,
  bridge: gasInfoSchema,
  obfuscation: gasInfoSchema,
  removeLiquidity: gasInfoSchema,
  swap: gasInfoSchema
});

// Define the MongoDB schema for gas used
const gasUsedSchema = new mongoose.Schema({
  byActionType: gasUsedByActionTypeSchema,
  byBlockchain: gasUsedByBlockchainSchema,
  byProtocol: gasUsedByProtocolSchema,
});

// Define the MongoDB schema for transaction counts
const trxCountsSchema = new mongoose.Schema({
  byActionType: Object,
  byBlockchain: Object,
  byProtocol: Object,
});

// Define the MongoDB schema for transaction volume
const trxVolumeSchema = new mongoose.Schema({
  byBlockchain: Object,
  byProtocol: Object,
  byActionType: Object,
});

// Define the MongoDB schema for the entire data structure
const botStatisticsSchema = new mongoose.Schema({
  gasUsed: gasUsedSchema,
  trxCounts: trxCountsSchema,
  trxVolume: trxVolumeSchema,
});

// Create a model for your data
const BotStats = mongoose.model('BotStatistics', botStatisticsSchema);

module.exports = BotStats;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWallet = void 0;
const wallet_model_1 = __importDefault(require("../models/wallets/wallet.model"));
const addWallet = async (req, res) => {
    try {
        const { airdrops, balances, blockchains, capital, flow, keys, // @todo make bot contain the master key.
        ownershipPercentage, phases, qualificationTargets, statistics, temporal, timestamps, tokens, trxs, } = req.body;
        const newWallet = new wallet_model_1.default({
            airdrops,
            balances,
            blockchains,
            capital,
            flow,
            keys,
            ownershipPercentage,
            phases,
            qualificationTargets,
            statistics,
            temporal,
            timestamps,
            tokens,
            trxs,
        });
        await newWallet.save();
        res.status(201).json({ message: 'Wallet added successfully', wallet: newWallet });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addWallet = addWallet;
//# sourceMappingURL=wallet.js.map
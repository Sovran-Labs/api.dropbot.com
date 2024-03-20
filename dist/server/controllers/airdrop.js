"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAirdrop = void 0;
const airdrop_model_1 = __importDefault(require("../models/airdrop/airdrop.model"));
const addAirdrop = async (req, res) => {
    try {
        const { blockchains, protocols, name, qualifyingTargets, snapshots } = req.body;
        const newAirdrop = new airdrop_model_1.default({ blockchains, protocols, name, qualifyingTargets, snapshots });
        await newAirdrop.save();
        res.status(201).json({ message: 'Airdrop added successfully', airdrop: newAirdrop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addAirdrop = addAirdrop;
//# sourceMappingURL=airdrop.js.map
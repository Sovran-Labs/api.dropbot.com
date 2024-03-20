"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMasterKey = void 0;
const keys_model_1 = __importDefault(require("../models/keys/keys.model"));
const addMasterKey = async (req, res) => {
    try {
        const { nmenomic, path, publicKey, privateKey, timestamp } = req.body;
        const newMasterKey = new keys_model_1.default({ nmenomic, path, publicKey, privateKey, timestamp });
        await newMasterKey.save();
        res.status(201).json({ message: 'Master Key added successfully', masterKey: newMasterKey });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addMasterKey = addMasterKey;
//# sourceMappingURL=masterKey.js.map
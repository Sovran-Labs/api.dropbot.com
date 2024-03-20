"use strict";
// src/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_1 = require("../controllers/wallet");
const router = express_1.default.Router();
router.post('/addWallet', wallet_1.addWallet);
exports.default = router;
//# sourceMappingURL=wallet.js.map
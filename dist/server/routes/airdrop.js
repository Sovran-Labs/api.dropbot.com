"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const airdrop_1 = require("../controllers/airdrop");
const router = express_1.default.Router();
router.post('/addAirdrop', airdrop_1.addAirdrop);
exports.default = router;
//# sourceMappingURL=airdrop.js.map
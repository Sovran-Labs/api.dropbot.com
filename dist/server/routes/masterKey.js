"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const masterKey_1 = require("../controllers/masterKey");
const router = express_1.default.Router();
router.post('/addMasterKey', masterKey_1.addMasterKey);
exports.default = router;
//# sourceMappingURL=masterKey.js.map
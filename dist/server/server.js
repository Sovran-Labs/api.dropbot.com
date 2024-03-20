"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../clients/mongo");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./controllers/user");
const airdrop_1 = require("./controllers/airdrop");
const createFlow_1 = require("./controllers/createFlow");
const startFlow_1 = require("./controllers/startFlow");
const masterKey_1 = require("./controllers/masterKey");
const wallet_1 = require("./controllers/wallet");
const error_1 = __importDefault(require("./middleware/error"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.post('/addUser', user_1.addUser);
app.post('/addAirdrop', airdrop_1.addAirdrop);
app.post('/createFlow', createFlow_1.createFlow);
app.post('/addMasterKey', masterKey_1.addMasterKey);
app.post('/addWallet', wallet_1.addWallet);
app.post('/startFlow', startFlow_1.startFlow);
// app.get('/flows', getFlows)
app.use(error_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
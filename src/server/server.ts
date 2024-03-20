import cors from 'cors';
import 'dotenv/config';

import bodyParser from 'body-parser';
import express from 'express';
import './clients/mongo';

// Flows
import { clearFlowLogs } from '@/src/server/controllers/flows/clearFlowLogs';
import { chooseFlow } from '@/src/server/controllers/flows/chooseFlow';
import { getFlows } from '@/src/server/controllers/flows/getFlows';
import { startFlow } from '@/src/server/controllers/flows/startFlow';
import { deleteFlow } from '@/src/server/controllers/flows/deleteFlow';
import { getFlow } from '@/src/server/controllers/flows/getFlow';
// WalletAccounts
import { getWalletAccounts } from '@/src/server/controllers/walletAccounts/getWalletAccounts';
import { addWalletAccount } from '@/src/server/controllers/walletAccounts/addWalletAccount';
import { editWalletAccount } from '@/src/server/controllers/walletAccounts/editWalletAccount';
import { deleteWalletAccount } from '@/src/server/controllers/walletAccounts/deleteWalletAccount';
import { getWalletAccount } from '@/src/server/controllers/walletAccounts/getWalletAccount';
// Wallets
import { addWallet } from '@/src/server/controllers/wallets/addWallet';
import { getWallets } from '@/src/server/controllers/wallets/getWallets';
import { getWallet } from '@/src/server/controllers/wallets/getWallet';
import { editWallet } from '@/src/server/controllers/wallets/editWallet';
import { deleteWallet } from '@/src/server/controllers/wallets/deleteWallet';
// Statistics
import { getGasFees } from '@/src/server/controllers/statistics/getGasFees';
import { getTxnCount } from '@/src/server/controllers/statistics/getTxnCount';
import { getTxns } from '@/src/server/controllers/statistics/getTxns';
import { getUSDTransactionVolume } from '@/src/server/controllers/statistics/getUSDTxnVolume';
// Houdini
import { houdini_getSupportedTokens } from '@/src/server/controllers/houdini/houdini_getSupportedTokens';
import { houdini_getQuote } from '@/src/server/controllers/houdini/houdini_getQuote';

import errorMiddleware from './middleware/error';
import { updateUsdTxnVolume } from '@/src/server/controllers/statistics/updateUsdTxnVolume';
import { updateUsdGasVolume } from '@/src/server/controllers/statistics/updateUsdGasVolume';
import { getUSDTargetVolume } from '@/src/server/controllers/statistics/getUSDTargetVolume';
import { syncSwap_getSupportedTokens_MAINNET } from '@/src/server/controllers/syncSwap/syncSwap_getSupportedTokens_MAINNET';
import { syncSwap_getSupportedTokens_TESTNET } from '@/src/server/controllers/syncSwap/syncSwap_getSupportedTokens_TESTNET';
import { orbiter_getCrossChainRouters_MAINNET } from '@/src/server/controllers/orbiter/orbiter_getCrosschainRouters_MAINNET';
import { orbiter_getCrossChainRouters_TESTNET } from '@/src/server/controllers/orbiter/orbiter_getCrosschainRouters_TESTNET';
import { orbiter_getChains_MAINNET } from '@/src/server/controllers/orbiter/orbiter_getChains_MAINNET';
import { orbiter_getChains_TESTNET } from '@/src/server/controllers/orbiter/orbiter_getChains_TESTNET';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin(requestOrigin, callback) {
      const allowedOrigins = ['https://trial.drop-bot.com', 'https://next-app-project-vlkqclhp4q-uc.a.run.app'];
      if (!requestOrigin) {
        return callback(null, true);
      }

      if (requestOrigin.includes('localhost')) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(requestOrigin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.get('/health', (req, res) => {
  res.send('OK');
});

// WalletAccounts
app.post('/walletAccount', addWalletAccount);
app.patch('/walletAccount', editWalletAccount);
app.get('/walletAccounts', getWalletAccounts);
app.get('/walletAccount/:_id', getWalletAccount);
app.delete('/walletAccount', deleteWalletAccount);
// Wallets
app.post('/wallet', addWallet);
app.patch('/wallet', editWallet);
app.get('/wallets', getWallets);
app.get('/wallet/:_id', getWallet);
app.delete('/wallet', deleteWallet);
// Flows
app.post('/chooseFlow', chooseFlow);
app.get('/flow/:_id', getFlow);
app.get('/flows', getFlows);
app.post('/startFlow', startFlow);
app.patch('/clearFlowLogs/:flowId', clearFlowLogs);
app.delete('/flow', deleteFlow);
// Statistics
app.get('/getTxns/:flowId', getTxns);
app.get('/getGasFees/:flowId', getGasFees);
app.get('/getTxnCount/:flowId', getTxnCount);
app.patch('/updateUsdTxnVolume/:flowId', updateUsdTxnVolume);
app.patch('/updateUsdGasVolume/:flowId', updateUsdGasVolume);
app.get('/getUSDTransactionVolume/:flowId', getUSDTransactionVolume);
app.get('/getUSDTargetVolume/:flowId', getUSDTargetVolume);

// Houdini
app.get('/houdini/getSupportedTokens', houdini_getSupportedTokens);
app.post('/houdini/getQuote', houdini_getQuote);

// Orbiter
app.get('/orbiter/getCrossChainRoutersMainnet', orbiter_getCrossChainRouters_MAINNET);
app.get('/orbiter/getCrossChainRoutersTestnet', orbiter_getCrossChainRouters_TESTNET);
app.get('/orbiter/getChainsMainnet', orbiter_getChains_MAINNET);
app.get('/orbiter/getChainsTestnet', orbiter_getChains_TESTNET);

// SyncSwap
app.get('/syncSwap/getSupportedTokensMainnet', syncSwap_getSupportedTokens_MAINNET);
app.get('/syncSwap/getSupportedTokensTestnet', syncSwap_getSupportedTokens_TESTNET);

app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

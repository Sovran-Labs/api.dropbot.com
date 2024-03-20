import { Request, Response } from 'express';
import { FlowModel } from '@/src/server/models/flow/flow';
import { BuildFlowTemplatesMenu } from '@/src/config/FlowTemplates';
import assert from 'assert';
import { CycleModel } from '../../ts/interfaces/cycle';
import axios from 'axios';
import SyncswapSupportedTokensTestnet from '@/src/config/SyncswapSupportedTokensTestnet.json';
import SyncswapSupportedTokensMainnet from '@/src/config/SyncswapSupportedTokensMainnet.json';

export const chooseFlow = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('calling chooseFlow...');

    const B = req.body;
    // replace tokens contract address string with the full token object by matching the tokens contract address in the
    if (B.templateId === '7c') {
      const syncswapSupportedTokensTestnet = SyncswapSupportedTokensTestnet;
      B.tokenA = syncswapSupportedTokensTestnet.filter((token) => token.address === B.tokenAAddress);
      B.tokenB = syncswapSupportedTokensTestnet.filter((token) => token.address === B.tokenBAddress);
    } else if (B.templateId === '7d') {
      const syncswapSupportedTokensMainnet = SyncswapSupportedTokensMainnet;
      B.tokenA = syncswapSupportedTokensMainnet.filter((token) => token.address === B.tokenAAddress);
      B.tokenB = syncswapSupportedTokensMainnet.filter((token) => token.address === B.tokenBAddress);
    }
    const FlowTemplates = BuildFlowTemplatesMenu();
    const flowTemplate = FlowTemplates.find((i: any) => i.id === B.templateId);

    //@todo - pull in from front end.
    const usdTargetAmount = 0;
    const usdCurrentAmount = 0;
    const usdCurrentGasSpent = 0;

    // debugger;

    assert(flowTemplate);

    const newFlow = new FlowModel({
      template: flowTemplate,
      description: flowTemplate.description,
      state: {
        inputs: {
          ...B,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newFlow.save().then(async (savedFlow) => {
      if (savedFlow.template.id === '7c') {
        const newCycle = new CycleModel({
          flowTemplate,
          originalFlowId: savedFlow._id,
          name: '7c',
          description: flowTemplate.description,
          state: {
            inputs: {
              ...B,
            },
          },
          txnLog: [],
          usdTargetAmount,
          usdCurrentAmount,
          usdCurrentGasSpent,
          createdAt: new Date(),
          updatedAt: new Date(),
          schemaVersion: '1.0.0',
        });

        await newCycle.save();
      } else if (savedFlow.template.id === '7d') {
        const newCycle = new CycleModel({
          flowTemplate,
          originalFlowId: savedFlow._id,
          name: '7d',
          description: flowTemplate.description,
          state: {
            inputs: {
              ...B,
            },
          },
          txnLog: [],
          usdTargetAmount,
          usdCurrentAmount,
          usdCurrentGasSpent,
          createdAt: new Date(),
          updatedAt: new Date(),
          schemaVersion: '1.0.0',
        });

        await newCycle.save();
      }
      {
        return;
      }
    });

    // testing conversion
    // const url = `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=0.001&symbol=eth`;
    // const ethUSDValue = await axios.get(url, {
    //   headers: {
    //     'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
    //   },
    // });
    // console.log('ethUSDValue: ', ethUSDValue.data.data[0]);
    // const getUSDTransactionVolume = await axios.get(`/getUSDTransactionVolume/${flow.id}`);
    // console.log('getUSDTransactionVolume: ', getUSDTransactionVolume);

    res.status(201).json({ message: 'Chosen flow added successfully to db', flowId: newFlow?.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

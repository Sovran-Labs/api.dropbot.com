import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7aActions } from '@/src/config/As7aActions';

export interface ISyncswapSwapTemplate {
  actionUuid: string;
  name: As7aActions;
  dependencies: {
    account: {
      type: InputValueTypes;
      key: string;
    };
    blockchain: {
      type: InputValueTypes;
      val: Blockchains;
    };
    wethAddress: {
      type: InputValueTypes;
      key: string;
    };
    percentOfTokenABalance: {
      type: InputValueTypes;
      lowerBound: number;
      upperBound: number;
    };
    tokenA: {
      type: InputValueTypes;
      // SOURCE: https://polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270#code
      // SOURCE: WMATIC on Polygon is https://docs.uniswap.org/contracts/v3/reference/deployments
      val: {
        chainId: ChainIds;
        address: string;
        decimals: number;
        symbol: string;
        name: string;
      };
    };
    // SOURCE: https://polygonscan.com/token/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
    tokenB: {
      type: InputValueTypes;
      val: {
        chainId: ChainIds;
        address: string;
        decimals: number;
        symbol: string;
        name: string;
      };
    };
  };
}

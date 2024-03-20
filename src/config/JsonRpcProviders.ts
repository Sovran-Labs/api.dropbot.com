import { Blockchains } from './Blockchains';

export default {
  [Blockchains.POLYGON_MUMBAI]: process.env.POLYGON_MUMBAI_RPC_PROVIDER,
};

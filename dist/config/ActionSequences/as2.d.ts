import { Blockchains } from '../Blockchains';
import { ConfigValueTypes } from '../ConfigValueTypes';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';
declare const _default: {
    actions: {
        name: PolygonMumbaiActions;
        dependencies: {
            blockchain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            account: {
                type: ConfigValueTypes;
                key: string;
            };
            balances: {
                type: ConfigValueTypes;
                key: string;
            };
        };
    }[];
    id: string;
    description: string;
};
export default _default;
//# sourceMappingURL=as2.d.ts.map
import { Blockchains } from '../Blockchains';
import { ConfigValueTypes } from '../ConfigValueTypes';
import { GeneralActions } from '../GeneralActions';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';
declare const _default: {
    actions: ({
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
            sourceChain?: undefined;
            destinationChain?: undefined;
            amount?: undefined;
        };
    } | {
        name: GeneralActions;
        dependencies: {
            sourceChain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            destinationChain: {
                type: ConfigValueTypes;
                val: Blockchains;
            };
            amount: {
                type: ConfigValueTypes;
                lowerBound: number;
                upperBound: number;
            };
            blockchain?: undefined;
            account?: undefined;
            balances?: undefined;
        };
    })[];
    id: string;
    description: string;
};
export default _default;
//# sourceMappingURL=as3.d.ts.map
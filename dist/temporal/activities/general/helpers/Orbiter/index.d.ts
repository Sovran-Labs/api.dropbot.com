import * as Utils from "./src/utils";
import * as Bridge from "./src/orbiter";
import * as Constant from "./config/constant";
declare const _default: {
    bridge: (swap: {
        evmSigner: import("ethers").Wallet;
        token: string;
        fromChain: import("./types").Chains;
        toChain: import("./types").Chains;
        amount?: string | undefined;
        max?: boolean | undefined;
        network?: "TESTNET" | "MAINNET" | undefined;
    }) => Promise<void>;
    Constant: typeof Constant;
    Utils: typeof Utils;
    Bridge: typeof Bridge;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
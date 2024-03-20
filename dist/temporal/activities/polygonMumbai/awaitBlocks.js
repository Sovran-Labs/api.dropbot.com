"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLYGON_MUMBAI_awaitBlocks = void 0;
const status_1 = require("@/src/ts/interfaces/status");
async function POLYGON_MUMBAI_awaitBlocks(args) {
    //   const { jsonRpcProvider } = await connectInfuraJsonRpcProvider();
    //   const blockA = await jsonRpcProvider?.getBlockNumber();
    //   let blockB = blockA;
    //   while (blockB - blockA < args.amountOfBlocks) {
    //     await sleep('4s');
    //     blockB = await jsonRpcProvider?.getBlockNumber();
    //   }
    return {
        status: status_1.Status.SUCCESS,
    };
}
exports.POLYGON_MUMBAI_awaitBlocks = POLYGON_MUMBAI_awaitBlocks;
//# sourceMappingURL=awaitBlocks.js.map
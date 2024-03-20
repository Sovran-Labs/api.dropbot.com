"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_native_token = void 0;
const is_native_token = (tokenAddress) => {
    // polygon matic token
    if (tokenAddress === '0x0000000000000000000000000000000000001010')
        return true;
    return /^0x0+$/i.test(tokenAddress);
};
exports.is_native_token = is_native_token;
//# sourceMappingURL=transfer.js.map
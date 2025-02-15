"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cross_address_abi = void 0;
exports.cross_address_abi = [
    {
        inputs: [
            { internalType: 'address payable', name: '_to', type: 'address' },
            { internalType: 'bytes', name: '_ext', type: 'bytes' },
        ],
        name: 'transfer',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '_token', type: 'address' },
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256', name: '_amount', type: 'uint256' },
            { internalType: 'bytes', name: '_ext', type: 'bytes' },
        ],
        name: 'transferERC20',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
//# sourceMappingURL=crossAddress.js.map
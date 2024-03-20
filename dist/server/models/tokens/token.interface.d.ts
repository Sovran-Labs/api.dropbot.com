import { TBlockchainName, TTokenName, TTokenSymbol } from '@/src/ts/types';
export interface IToken {
    currentPrice: string;
    decimals: number;
    name: TTokenName;
    nativeBlockchains: TBlockchainName[];
    symbol: TTokenSymbol;
}
//# sourceMappingURL=token.interface.d.ts.map
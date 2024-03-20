export interface IFlow {
    actionSequence: {
        actions: {
            name: string;
            blockchain: string;
            dependencies: any;
        }[];
        description: string;
        id: string;
    };
    name: string;
    state: any;
    description: string;
    createdAt: string;
}
//# sourceMappingURL=flow.interface.d.ts.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlow = void 0;
const flow_model_1 = __importDefault(require("../../models/flow/flow.model"));
const ActionSequences_1 = __importDefault(require("../../config/ActionSequences"));
const assert_1 = __importDefault(require("assert"));
const createFlow = async (req, res) => {
    try {
        console.log('calling createFlow...');
        console.log('req.body', req.body);
        const { actionSequenceId, account, globalState, description } = req.body;
        const actionSequence = ActionSequences_1.default.find((i) => i.id === actionSequenceId);
        console.log('actionSequence', actionSequence);
        (0, assert_1.default)(actionSequence);
        const newFlow = new flow_model_1.default({
            actionSequence,
            description,
            state: {
                global: globalState,
            },
            createdAt: new Date().toString(),
        });
        await newFlow.save();
        res.status(201).json({ message: 'Flow added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createFlow = createFlow;
//# sourceMappingURL=createFlow.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFlow = void 0;
const temporal_client_1 = require("../../clients/temporal_client");
const nanoid_1 = require("nanoid");
const workflows_1 = require("../../temporal/workflows");
const flow_model_1 = __importDefault(require("../../models/flow/flow.model"));
const startFlow = async (req, res, next) => {
    try {
        console.log('calling startFlow');
        const id = req.body.flowId;
        const doc = await flow_model_1.default.findById({ _id: id });
        console.log('doc --->', doc);
        if (doc) {
            for (let i = 0; i < 1; i++) {
                await temporal_client_1.temporalClient.workflow.start(workflows_1.routeWorkFlow, {
                    taskQueue: 'default',
                    args: [doc.id, doc?.actionSequence?.actions],
                    workflowId: 'workflow-' + (0, nanoid_1.nanoid)(), // in practice, use a meaningful business ID, like customerId or transactionId
                });
            }
            res.status(201).json({ message: 'Started flow successfully' });
        }
        else {
            throw 'flow not found';
        }
    }
    catch (e) {
        next(e);
    }
};
exports.startFlow = startFlow;
//# sourceMappingURL=startFlow.js.map
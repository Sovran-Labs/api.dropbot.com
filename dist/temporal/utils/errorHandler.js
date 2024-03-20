"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const workflow_1 = require("@temporalio/workflow");
function errorHandler(e) {
    console.error('WORKFLOW ERROR HANDLER');
    console.error(e);
    if (e instanceof Error) {
        throw new workflow_1.ApplicationFailure(e.toString());
    }
    else {
        throw new workflow_1.ApplicationFailure('Workflow error', null, null, [e]);
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map
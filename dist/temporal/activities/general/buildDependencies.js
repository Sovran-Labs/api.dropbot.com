"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_buildDependencies = void 0;
const lodash_get_1 = __importDefault(require("lodash.get"));
const ConfigValueTypes_1 = require("../../../config/ConfigValueTypes");
const FlowConfig_1 = __importDefault(require("../../../config/FlowConfig"));
const db_1 = require("../../clients/db");
const flow_model_1 = __importDefault(require("../../../models/flow/flow.model"));
async function GENERAL_buildDependencies(flowId, dependenciesSpec) {
    await (0, db_1.connectDB)();
    const dependencies = {
        flowId, // Always include the flowId : )
    };
    const dependencyKeys = Object.keys(dependenciesSpec);
    // console.log('dependencyKeys', dependencyKeys);
    for (const dk of dependencyKeys) {
        // console.log('dk', dk);
        if (dependenciesSpec[dk].type === ConfigValueTypes_1.ConfigValueTypes.CONFIG) {
            // console.log();
            // console.log('CONFIG');
            // console.log();
            dependencies[dk] = (0, lodash_get_1.default)(FlowConfig_1.default, dependenciesSpec[dk].key);
        }
        else if (dependenciesSpec[dk].type === ConfigValueTypes_1.ConfigValueTypes.HARDCODED) {
            // console.log();
            // console.log('HARDCODED');
            // console.log();
            dependencies[dk] = dependenciesSpec[dk].val;
        }
        else if (dependenciesSpec[dk].type === ConfigValueTypes_1.ConfigValueTypes.RANGE) {
            // console.log();
            // console.log('RANGE');
            // console.log();
            const value = Math.floor(Math.random() * (dependenciesSpec[dk].upperBound - dependenciesSpec[dk].lowerBound + 1)) +
                dependenciesSpec[dk].lowerBound;
            dependencies[dk] = value;
        }
        else if (dependenciesSpec[dk].type === ConfigValueTypes_1.ConfigValueTypes.STATE) {
            // console.log('vvv vvv vvv');
            // console.log('STATE');
            // console.log('dependenciesSpec[dk].key', dependenciesSpec[dk].key);
            // console.log();
            // -> Retrieve Flow State
            // console.log('flowId', flowId);
            const doc = await flow_model_1.default.findOne({
                _id: flowId,
            });
            // console.log();
            // console.log('doc', doc);
            // console.log();
            // -> Access state by key
            dependencies[dk] = (0, lodash_get_1.default)(doc?.state, dependenciesSpec[dk].key);
        }
        else {
            throw 'UNSUPPORTED_DEPENDENCY_TYPE';
        }
    }
    return dependencies;
}
exports.GENERAL_buildDependencies = GENERAL_buildDependencies;
//# sourceMappingURL=buildDependencies.js.map
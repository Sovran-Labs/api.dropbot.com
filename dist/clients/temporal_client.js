"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.temporalClient = void 0;
// Temporal Client
const client_1 = require("@temporalio/client");
let temporalConnection;
async function main() {
    temporalConnection = await client_1.Connection.connect({ address: 'localhost:7233' }); // TODO make ENV
}
main()
    .then(() => {
    console.log('Temporal connection successful √');
})
    .catch((e) => console.error(e));
// Create client.
const temporalClient = new client_1.Client({
    connection: temporalConnection,
    namespace: 'default',
});
exports.temporalClient = temporalClient;
//# sourceMappingURL=temporal_client.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = void 0;
// activities.js
const db_1 = require("../../clients/db");
const saveData = async (data) => {
    const db = await (0, db_1.connectDB)();
    // Perform database operations
    // For example, insert data into a collection
    // await db.collection('yourCollection').insertOne(data);
    await (0, db_1.disconnectDB)();
};
exports.saveData = saveData;
//# sourceMappingURL=saveData.js.map
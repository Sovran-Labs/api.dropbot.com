"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const user_model_1 = require("../models/user/user.model");
const addUser = async (req, res) => {
    try {
        const { capital, eoa, ownershipPercentage, name, timestamps } = req.body;
        const newUser = new user_model_1.UserModel({ capital, eoa, ownershipPercentage, name, timestamps });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addUser = addUser;
//# sourceMappingURL=user.js.map
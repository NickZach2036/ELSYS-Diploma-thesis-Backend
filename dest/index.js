"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 2999;
app.use(express_1.default.json());
app.use('/auth', routes_1.authRoutes);
utils_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected.');
    return utils_1.sequelize.sync();
})
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
})
    .catch((err) => console.error('Unable to connect to database:', err));

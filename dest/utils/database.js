"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = __importDefault(require("../constants"));
const sequelize = new sequelize_1.Sequelize(constants_1.default.POSTGRES_DB, constants_1.default.POSTGRES_USER, constants_1.default.POSTGRES_PASSWORD, {
    host: constants_1.default.POSTGRES_HOST,
    port: Number(constants_1.default.DATABASE_PORT),
    dialect: 'postgres',
});
exports.default = sequelize;

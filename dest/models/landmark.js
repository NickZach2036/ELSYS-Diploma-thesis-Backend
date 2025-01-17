"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
const station_1 = __importDefault(require("./station"));
class Landmark extends sequelize_1.Model {
}
Landmark.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: station_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Landmark',
});
exports.default = Landmark;

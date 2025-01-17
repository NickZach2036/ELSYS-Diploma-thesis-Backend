"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
    POSTGRES_USER: process.env.POSTGRES_USER || 'root',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'root',
    POSTGRES_DB: process.env.POSTGRES_DB || 'thesis',
    DATABASE_PORT: process.env.DATABASE_PORT || '6543',
    PORT: process.env.PORT || '2999',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'default_secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};
exports.default = constants;

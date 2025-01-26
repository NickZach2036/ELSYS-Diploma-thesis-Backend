"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = exports.landmarkRoutes = exports.authRoutes = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.authRoutes = auth_1.default;
const landmark_1 = __importDefault(require("./landmark"));
exports.landmarkRoutes = landmark_1.default;
const comment_1 = __importDefault(require("./comment"));
exports.commentRoutes = comment_1.default;

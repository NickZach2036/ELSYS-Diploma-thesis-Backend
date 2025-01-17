"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const constants_1 = __importDefault(require("../constants"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required.' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully.', user });
    }
    catch (error) {
        console.error('Register error:', error);
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required.' });
            return;
        }
        const user = yield user_1.default.findOne({ where: { username } });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, constants_1.default.JWT_SECRET_KEY, {
            expiresIn: constants_1.default.JWT_EXPIRES_IN,
        });
        res.status(200).json({ message: 'Login successful.', token });
    }
    catch (error) {
        console.error('Login error:', error);
        next(error);
    }
});
exports.login = login;

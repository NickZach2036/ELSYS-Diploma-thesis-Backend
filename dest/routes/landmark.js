"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const landmark_1 = require("../controllers/landmark");
const router = express_1.default.Router();
router.get('/', landmark_1.getLandmarks);
router.post('/', landmark_1.createLandmark);
router.put('/:id', landmark_1.updateLandmark);
router.delete('/:id', landmark_1.deleteLandmark);
router.post('/new', landmark_1.createNewLandmark);
exports.default = router;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewLandmark = exports.deleteLandmark = exports.updateLandmark = exports.createLandmark = exports.getLandmarks = void 0;
const models_1 = require("../models");
const getLandmarks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landmarks = yield models_1.Landmark.findAll({
            include: [
                {
                    model: models_1.Station,
                    attributes: ['id', 'name', 'location'],
                },
            ],
        });
        res.status(200).json(landmarks);
    }
    catch (error) {
        console.error('Error fetching landmarks:', error);
        next(error);
    }
});
exports.getLandmarks = getLandmarks;
const createLandmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, location, stationId } = req.body;
        if (!name || !description || !location || !stationId) {
            res.status(400).json({
                error: 'Name, description, location, and stationId are required.',
            });
            return;
        }
        const landmark = yield models_1.Landmark.create({
            name,
            description,
            location,
            stationId,
        });
        res.status(201).json(landmark);
    }
    catch (error) {
        console.error('Error creating landmark:', error);
        next(error);
    }
});
exports.createLandmark = createLandmark;
const updateLandmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, location, stationId } = req.body;
        const landmark = yield models_1.Landmark.findByPk(id);
        if (!landmark) {
            res.status(404).json({ error: 'Landmark not found.' });
            return;
        }
        landmark.name = name || landmark.name;
        landmark.description = description || landmark.description;
        landmark.location = location || landmark.location;
        landmark.stationId = stationId || landmark.stationId;
        yield landmark.save();
        res.status(200).json(landmark);
    }
    catch (error) {
        console.error('Error updating landmark:', error);
        next(error);
    }
});
exports.updateLandmark = updateLandmark;
const deleteLandmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const landmark = yield models_1.Landmark.findByPk(id);
        if (!landmark) {
            res.status(404).json({ error: 'Landmark not found.' });
            return;
        }
        yield landmark.destroy();
        res.status(204).json({ message: 'Landmark deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting landmark:', error);
        next(error);
    }
});
exports.deleteLandmark = deleteLandmark;
const createNewLandmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, location, stationId } = req.body;
        if (!name || !description || !location || !stationId) {
            res.status(400).json({ error: 'All fields are required.' });
            return;
        }
        const newLandmark = yield models_1.Landmark.create({
            name,
            description,
            location,
            stationId,
        });
        res.status(201).json(newLandmark);
    }
    catch (error) {
        console.error('Error creating new landmark:', error);
        next(error);
    }
});
exports.createNewLandmark = createNewLandmark;

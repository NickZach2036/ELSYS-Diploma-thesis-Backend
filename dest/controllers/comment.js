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
exports.deleteComment = exports.getCommentsByLandmark = exports.createComment = void 0;
const models_1 = require("../models");
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, userId, landmarkId } = req.body;
        if (!content || !userId || !landmarkId) {
            res.status(400).json({ error: 'All fields are required.' });
            return;
        }
        // Validate the landmarkId exists
        const landmark = yield models_1.Landmark.findByPk(landmarkId);
        if (!landmark) {
            res.status(404).json({ error: 'Landmark not found.' });
            return;
        }
        const comment = yield models_1.Comment.create({
            content,
            userId,
            landmarkId,
        });
        res.status(201).json(comment);
    }
    catch (error) {
        console.error('Error creating comment:', error);
        next(error);
    }
});
exports.createComment = createComment;
const getCommentsByLandmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { landmarkId } = req.params;
        const comments = yield models_1.Comment.findAll({
            where: { landmarkId },
            include: [
                {
                    model: models_1.User,
                    attributes: ['id', 'username'],
                },
            ],
        });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        next(error);
    }
});
exports.getCommentsByLandmark = getCommentsByLandmark;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield models_1.Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ error: 'Comment not found.' });
            return;
        }
        yield comment.destroy();
        res.status(204).json({ message: 'Comment deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting comment:', error);
        next(error);
    }
});
exports.deleteComment = deleteComment;

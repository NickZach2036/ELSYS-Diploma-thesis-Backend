import express from 'express';
import {
  createComment,
  getCommentsByLandmark,
  deleteComment,
} from '../controllers/comment';
import { authenticateJWT } from '../utils/sendRes';

const router = express.Router();

router.post('/', authenticateJWT, createComment);
router.get('/landmark/:landmarkId', getCommentsByLandmark);
router.delete('/:id', authenticateJWT, deleteComment);

export default router;

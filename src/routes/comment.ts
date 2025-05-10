import express from 'express';
import {
  createComment,
  getCommentsByLandmark,
  deleteComment,
} from '../controllers/comment';
import { authenticateToken } from '../utils/sendRes';

const router = express.Router();

router.post('/', authenticateToken, createComment);
router.get('/landmark/:landmarkId', getCommentsByLandmark);
router.delete('/:id', authenticateToken, deleteComment);

export default router;

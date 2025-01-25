import express from 'express';
import {
  createComment,
  getCommentsByLandmark,
  deleteComment,
} from '../controllers/comment';

const router = express.Router();

router.post('/', createComment);
router.get('/landmark/:landmarkId', getCommentsByLandmark);
router.delete('/:id', deleteComment);

export default router;

import express from 'express';
import {
  createLandmark,
  getLandmarks,
  updateLandmark,
  deleteLandmark,
  createUserLandmark,
} from '../controllers/landmark';
import { authenticateToken } from '../utils/sendRes';

const router = express.Router();

router.get('/', getLandmarks);
router.post('/', createLandmark);
router.put('/:id', updateLandmark);
router.delete('/:id', deleteLandmark);

router.post('/new', authenticateToken, createUserLandmark);

export default router;

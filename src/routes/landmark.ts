import express from 'express';
import {
  createLandmark,
  getLandmarks,
  updateLandmark,
  deleteLandmark,
  createNewLandmark,
} from '../controllers/landmark';

const router = express.Router();

router.get('/', getLandmarks);
router.post('/', createLandmark);
router.put('/:id', updateLandmark);
router.delete('/:id', deleteLandmark);

router.post('/new', createNewLandmark);

export default router;

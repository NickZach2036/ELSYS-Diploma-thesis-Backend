import express from 'express';
import { createStation, getStations } from '../controllers/station';

const router = express.Router();

router.post('/createStation', createStation);
router.post('/getStations', getStations);

export default router;

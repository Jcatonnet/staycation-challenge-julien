import express from 'express';
import { getHotelsWithAvailibility } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getHotelsWithAvailibility);

export default router;

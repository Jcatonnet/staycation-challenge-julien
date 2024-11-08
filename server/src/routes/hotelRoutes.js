import express from 'express';
import { getHotelsWithAvailability } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getHotelsWithAvailability);

export default router;

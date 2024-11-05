import express from 'express';
import { fetchUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', fetchUser);

export default router;

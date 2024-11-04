// routes/userRoutes.js
import express from 'express';
import { deleteUser, updateUser } from '../controllers/Users.js';

const router = express.Router();

// Rute untuk menghapus user berdasarkan ID
router.delete('/users/:id', deleteUser);

// Rute untuk mengedit user berdasarkan ID
router.put('/users/:id', updateUser);

export default router;

import express from 'express';
import { register,login,deleteUser,getUsers,deleteAllUser } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.delete('/delete/:id', deleteUser);
router.delete('/delete', deleteAllUser);
export default router;
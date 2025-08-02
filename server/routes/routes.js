import express from 'express';
import { addUser, deleteUser, getAllUser, updateUser, getUserFile } from '../controller/userController.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.get("/users", getAllUser);
router.get("/users/:id/file", getUserFile); // Serve uploaded file
router.post('/users', upload.single('file'), addUser);
router.put('/users/:id', upload.single('file'), updateUser);
router.delete("/users/:id", deleteUser);

export default router;

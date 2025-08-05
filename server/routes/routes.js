// routes/routes.js
import express from 'express';
import multer from 'multer';
import {
    addUser,
    deleteUser,
    getAllUser,
    updateUser,
    getUserFile
} from '../controller/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const upload = multer();
const router = express.Router();

// ⛔ Require authentication for all user-related routes
router.get("/users", protect, getAllUser);
router.get("/users/:id/file", protect, getUserFile);
router.post("/users", protect, upload.single('file'), addUser);
router.put("/users/:id", protect, upload.single('file'), updateUser);
router.delete("/users/:id", protect, deleteUser);

export default router;

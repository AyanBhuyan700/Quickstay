import express from 'express';
import { protect, isOwner } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import {
    addRoom,
    getOwnerRooms,
    toggleRoomAvailability,
    getAllRooms,
    getRoomById,
} from '../controllers/roomController.js';

const roomRouter = express.Router();

// Public routes
roomRouter.get('/all', getAllRooms);
roomRouter.get('/:id', getRoomById);

// Owner protected routes
roomRouter.post('/add', protect, isOwner, upload.array('images', 4), addRoom);
roomRouter.get('/owner/rooms', protect, isOwner, getOwnerRooms);
roomRouter.patch('/owner/toggle-availability/:roomId', protect, isOwner, toggleRoomAvailability);

export default roomRouter;

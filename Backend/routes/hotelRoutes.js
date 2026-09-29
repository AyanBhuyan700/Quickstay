import express from 'express';
import { protect, isOwner } from '../middlewares/authMiddleware.js';
import {
    registerHotel,
    getOwnerHotel,
    getAllHotels,
    updateHotel,
} from '../controllers/hotelController.js';

const hotelRouter = express.Router();

// Public routes
hotelRouter.get('/all', getAllHotels);

// Owner protected routes
hotelRouter.post('/register', protect, registerHotel);
hotelRouter.get('/owner-hotel', protect, isOwner, getOwnerHotel);
hotelRouter.put('/update', protect, isOwner, updateHotel);

export default hotelRouter;

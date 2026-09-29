import express from 'express';
import { protect, isOwner } from '../middlewares/authMiddleware.js';
import {
    createBooking,
    getUserBookings,
    cancelBooking,
    payBooking,
    getOwnerDashboard,
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

// User routes
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user-bookings', protect, getUserBookings);
bookingRouter.patch('/cancel/:bookingId', protect, cancelBooking);
bookingRouter.patch('/pay/:bookingId', protect, payBooking);

// Owner routes
bookingRouter.get('/owner-dashboard', protect, isOwner, getOwnerDashboard);

export default bookingRouter;

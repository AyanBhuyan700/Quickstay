import mongoose from 'mongoose';
import './User.js';
import './Room.js';
import './Hotel.js';

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            ref: 'User',
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
            required: true,
        },
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },
        offerCode: {
            type: String,
            default: '',
        },
        guests: {
            type: Number,
            required: true,
            default: 1,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'confirmed',
        },
        paymentMethod: {
            type: String,
            default: 'Pay At Hotel',
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

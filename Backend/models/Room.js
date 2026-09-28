import mongoose from 'mongoose';
import './Hotel.js';

const roomSchema = new mongoose.Schema(
    {
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
            required: true,
        },
        roomType: {
            type: String,
            required: true,
            enum: ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'],
        },
        pricePerNight: {
            type: Number,
            required: true,
            min: 0,
        },
        amenities: [
            {
                type: String,
            },
        ],
        images: [
            {
                type: String,
                required: true,
            },
        ],
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;

import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: String,
            ref: 'User',
            required: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "Luxury hotel offering world-class comfort and bespoke hospitality.",
        },
        image: {
            type: String,
            default: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
        },
        rating: {
            type: Number,
            default: 4.8,
        },
    },
    { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;

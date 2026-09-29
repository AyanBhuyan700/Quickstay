import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

// Register a new hotel for the authenticated user and save to MongoDB
export const registerHotel = async (req, res) => {
    try {
        const { name, contact, address, city, description, image } = req.body;

        if (!name || !contact || !address || !city) {
            return res.status(400).json({ success: false, message: 'All fields (name, contact, address, city) are required' });
        }

        const existingHotel = await Hotel.findOne({ owner: req.user._id });
        if (existingHotel) {
            return res.status(400).json({ success: false, message: 'You have already registered a hotel.', hotel: existingHotel });
        }

        const hotel = await Hotel.create({
            name,
            contact,
            address,
            city,
            description: description || undefined,
            image: image || undefined,
            owner: req.user._id,
        });

        // Upgrade user role to hotelOwner
        await User.findByIdAndUpdate(req.user._id, { role: 'hotelOwner' });
        req.user.role = 'hotelOwner';

        res.status(201).json({
            success: true,
            message: 'Hotel registered and saved in database successfully!',
            hotel,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get the authenticated owner's hotel from MongoDB
export const getOwnerHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'No hotel found for this owner.' });
        }
        res.json({ success: true, hotel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all hotels from MongoDB
export const getAllHotels = async (req, res) => {
    try {
        const { city } = req.query;
        const query = {};
        if (city) {
            query.city = { $regex: city, $options: 'i' };
        }
        const hotels = await Hotel.find(query).populate('owner', 'username email image').sort({ createdAt: -1 });
        res.json({ success: true, hotels });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update hotel details
export const updateHotel = async (req, res) => {
    try {
        const { name, contact, address, city, description, image } = req.body;
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found for this owner.' });
        }

        if (name) hotel.name = name;
        if (contact) hotel.contact = contact;
        if (address) hotel.address = address;
        if (city) hotel.city = city;
        if (description) hotel.description = description;
        if (image) hotel.image = image;

        await hotel.save();

        res.json({ success: true, message: 'Hotel updated successfully', hotel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

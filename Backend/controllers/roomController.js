import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { uploadToCloudinary } from '../configs/cloudinary.js';

// Add Room (Hotel Owner)
export const addRoom = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.status(400).json({ success: false, message: 'Please register your hotel first before adding rooms.' });
        }

        const { roomType, pricePerNight } = req.body;
        let amenities = req.body.amenities;
        if (typeof amenities === 'string') {
            try {
                amenities = JSON.parse(amenities);
            } catch (e) {
                amenities = amenities.split(',').map((s) => s.trim());
            }
        }

        if (!roomType || !pricePerNight) {
            return res.status(400).json({ success: false, message: 'Room type and price per night are required.' });
        }

        const imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const url = await uploadToCloudinary(file.buffer, file.mimetype);
                imageUrls.push(url);
            }
        } else if (req.body.images && Array.isArray(req.body.images)) {
            imageUrls.push(...req.body.images);
        }

        if (imageUrls.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one image is required.' });
        }

        const newRoom = await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: Number(pricePerNight),
            amenities: Array.isArray(amenities) ? amenities : [],
            images: imageUrls,
            isAvailable: true,
        });

        res.status(201).json({ success: true, message: 'Room added successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Owner's Rooms
export const getOwnerRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.json({ success: true, rooms: [] });
        }

        const rooms = await Room.find({ hotel: hotel._id }).populate('hotel').sort({ createdAt: -1 });
        res.json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle Room Availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.params;
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.status(403).json({ success: false, message: 'Unauthorized hotel owner' });
        }

        const room = await Room.findOne({ _id: roomId, hotel: hotel._id });
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        room.isAvailable = !room.isAvailable;
        await room.save();

        res.json({ success: true, message: `Room marked as ${room.isAvailable ? 'available' : 'unavailable'}`, room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Public Rooms with Search & Filters
export const getAllRooms = async (req, res) => {
    try {
        const { city, roomType, minPrice, maxPrice, sort, search } = req.query;

        // Build room query
        const query = { isAvailable: true };

        if (roomType) {
            const types = Array.isArray(roomType) ? roomType : roomType.split(',');
            query.roomType = { $in: types };
        }

        if (minPrice || maxPrice) {
            query.pricePerNight = {};
            if (minPrice) query.pricePerNight.$gte = Number(minPrice);
            if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'Price Low to High') {
            sortOption = { pricePerNight: 1 };
        } else if (sort === 'Price High to Low') {
            sortOption = { pricePerNight: -1 };
        } else if (sort === 'Newest First') {
            sortOption = { createdAt: -1 };
        }

        let rooms = await Room.find(query).populate({
            path: 'hotel',
            populate: { path: 'owner', select: 'username email image' },
        }).sort(sortOption);

        // Filter by city or general search text if provided
        if (city) {
            rooms = rooms.filter((r) => r.hotel && r.hotel.city.toLowerCase().includes(city.toLowerCase()));
        }

        if (search) {
            const lowerSearch = search.toLowerCase();
            rooms = rooms.filter(
                (r) =>
                    (r.hotel && (r.hotel.name.toLowerCase().includes(lowerSearch) || r.hotel.city.toLowerCase().includes(lowerSearch))) ||
                    r.roomType.toLowerCase().includes(lowerSearch)
            );
        }

        res.json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Room by ID
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id).populate({
            path: 'hotel',
            populate: { path: 'owner', select: 'username email image' },
        });

        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        res.json({ success: true, room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

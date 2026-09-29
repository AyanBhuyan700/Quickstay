import User from '../models/User.js';
import { clerkClient } from '@clerk/express';
import mongoose from 'mongoose';

export const protect = async (req, res, next) => {
    try {
        const userId = req.auth?.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated. Please log in.' });
        }

        // Check if database is ready to avoid 10s query buffering timeouts
        if (mongoose.connection.readyState !== 1) {
            try {
                if (process.env.MONGODB_URI) {
                    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
                }
            } catch (dbErr) {
                return res.status(503).json({
                    success: false,
                    message: 'Database is currently unreachable. Please ensure 0.0.0.0/0 is added to your MongoDB Atlas IP Access List.',
                });
            }
        }

        let user = await User.findById(userId);

        // Fallback: If user is logged into Clerk but webhook didn't sync to MongoDB yet
        if (!user) {
            try {
                const clerkUser = await clerkClient.users.getUser(userId);
                user = await User.create({
                    _id: userId,
                    username: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'User',
                    email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
                    image: clerkUser.imageUrl || '',
                    role: 'user',
                    recentSearchedCities: [],
                });
            } catch (clerkErr) {
                // If Clerk API fails, create a minimal user record
                user = await User.create({
                    _id: userId,
                    username: 'User',
                    email: '',
                    image: '',
                    role: 'user',
                    recentSearchedCities: [],
                });
            }
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const isOwner = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'hotelOwner') {
            return res.status(403).json({ success: false, message: 'Access denied: Hotel owner account required' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
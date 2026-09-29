import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/MongoDb.js';
import seedInitialData from './configs/seedData.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebHooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(cors());

// Clerk webhook route (accepts both json & raw body)
app.post('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

// Regular JSON parser for other endpoints
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.json({ message: 'QuickStay API is running smoothly' });
});

app.use('/api/user', userRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/room', roomRouter);
app.use('/api/booking', bookingRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

const port = process.env.PORT || 8081;

// Connect to MongoDB and seed default rooms before listening
const startServer = async () => {
    try {
        await connectDB();
        await seedInitialData();
    } catch (e) {
        console.warn("DB Startup warning:", e.message);
    }
    app.listen(port, () => {
        console.log(`Server Running on port: ${port}`);
    });
};

startServer();

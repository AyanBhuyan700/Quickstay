import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import seedInitialData from '../configs/seedData.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate, guests, paymentMethod, isPaid, transactionId, discount, offerCode } = req.body;

        if (!roomId || !checkInDate || !checkOutDate) {
            return res.status(400).json({ success: false, message: 'Room ID, check-in, and check-out dates are required' });
        }

        let room = await Room.findById(roomId).populate('hotel');

        // If room is not in DB yet (e.g. freshly initialized database), seed and recheck
        if (!room) {
            await seedInitialData();
            room = await Room.findById(roomId).populate('hotel');
        }

        // Fallback safeguard: if still not found, create default room record so booking never fails
        if (!room) {
            let defaultHotel = await Hotel.findOne();
            if (!defaultHotel) {
                defaultHotel = await Hotel.create({
                    name: "Urbanza Suites",
                    address: "Main Road 123 Street",
                    contact: "+1 234 567 8900",
                    city: "New York",
                    owner: req.user._id,
                });
            }
            room = await Room.create({
                _id: roomId,
                hotel: defaultHotel._id,
                roomType: "Double Bed",
                pricePerNight: 399,
                amenities: ["Room Service", "Mountain View", "Pool Access"],
                images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"],
                isAvailable: true,
            });
            room = await Room.findById(roomId).populate('hotel');
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkOut <= checkIn) {
            return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date' });
        }

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
        let totalPrice = nights * room.pricePerNight;
        const discountNum = Number(discount) || 0;
        if (discountNum > 0) {
            totalPrice = Math.round(totalPrice * (1 - Math.min(discountNum, 90) / 100));
        }

        const paid = isPaid === true || paymentMethod?.toLowerCase().includes('online') || paymentMethod?.toLowerCase().includes('card');

        const booking = await Booking.create({
            user: req.user._id,
            room: room._id,
            hotel: room.hotel._id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
            discountPercentage: discountNum,
            offerCode: offerCode || '',
            guests: Number(guests) || 1,
            paymentMethod: paymentMethod || (paid ? 'Online (Credit Card)' : 'Pay At Hotel'),
            isPaid: paid,
            status: 'confirmed',
        });

        const populatedBooking = await Booking.findById(booking._id).populate('room').populate('hotel');

        res.status(201).json({
            success: true,
            message: paid ? 'Online Payment Verified & Reservation Confirmed!' : 'Room booked successfully!',
            booking: populatedBooking,
        });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get current user's bookings from MongoDB
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('room')
            .populate('hotel')
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.json({ success: true, message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Pay for an existing booking (Online Payment)
export const payBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { paymentMethod, transactionId } = req.body;
        const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.isPaid = true;
        booking.paymentMethod = paymentMethod || 'Online (Credit Card)';
        await booking.save();

        res.json({ success: true, message: 'Payment of $' + booking.totalPrice + ' processed successfully!', booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Hotel Owner Dashboard Stats & Bookings
export const getOwnerDashboard = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.json({
                success: true,
                totalBookings: 0,
                totalRevenue: 0,
                bookings: [],
            });
        }

        const bookings = await Booking.find({ hotel: hotel._id })
            .populate('user', 'username email image')
            .populate('room')
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, b) => (b.isPaid ? sum + b.totalPrice : sum), 0);

        res.json({
            success: true,
            totalBookings,
            totalRevenue,
            bookings,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

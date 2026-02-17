import express from 'express';
import Booking from '../models/Booking.js';
import { verifyToken } from './auth.js'; // Assuming auth.js has a verifyToken middleware
import { sendBookingConfirmation } from '../utils/email.js';

const router = express.Router();

// @route POST /api/bookings
// @desc  Create a new booking (Public)
router.post('/', async (req, res) => {
    try {
        const { name, email, service, price, duration, screenshotUrl } = req.body;

        if (!name || !email || !service || !price || !duration || !screenshotUrl) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newBooking = new Booking({
            name,
            email,
            service,
            price,
            duration,
            screenshotUrl
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        console.error("Booking Creation Error:", err);
        res.status(500).json({ message: "Server error while creating booking" });
    }
});

// @route GET /api/bookings
// @desc  Get all bookings (Admin only)
router.get('/', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error("Fetch Bookings Error:", err);
        res.status(500).json({ message: "Server error while fetching bookings" });
    }
});

// @route PATCH /api/bookings/:id
// @desc  Update booking status (Admin only)
router.patch('/:id', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'verified', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: 'after' }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Trigger confirmation email if verified
        if (status === 'verified') {
            await sendBookingConfirmation(
                booking.email,
                booking.name,
                {
                    service: booking.service,
                    price: booking.price,
                    duration: booking.duration
                }
            );
        }

        res.json(booking);
    } catch (err) {
        console.error("Update Booking Error:", err);
        res.status(500).json({ message: "Server error while updating booking" });
    }
});

export default router;

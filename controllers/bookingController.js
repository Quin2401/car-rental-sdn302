const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');

// 4.1 GET /bookings - Retrieve all bookings [cite: 46, 47]
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4.2 POST /bookings - Create a new booking [cite: 48, 49]
exports.createBooking = async (req, res) => {
    try {
        const { customerName, carNumber, startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // Lấy thông tin xe để tính tiền [cite: 57]
        const car = await Car.findOne({ carNumber });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Kiểm tra trùng lịch (Overlap logic) [cite: 50, 51]
        const conflict = await Booking.findOne({
            carNumber,
            $or: [
                { startDate: { $lt: end }, endDate: { $gt: start } }
            ]
        });

        if (conflict) {
            return res.status(400).json({ message: "Car is already booked for these dates" }); // [cite: 51]
        }

        // Tự động tính tiền: (endDate - startDate) / (1000 * 60 * 60 * 24) [cite: 56, 57]
        const diffInMs = end - start;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); 
        const totalAmount = diffInDays * car.pricePerDay; // [cite: 57]

        const newBooking = new Booking({
            customerName,
            carNumber,
            startDate: start,
            endDate: end,
            totalAmount
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4.3 PUT /bookings/:bookingId - Update an existing booking [cite: 52, 53]
exports.updateBooking = async (req, res) => {
    try {
        const updated = await Booking.findByIdAndUpdate(req.params.bookingId, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Booking not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4.4 DELETE /bookings/:bookingId - Delete a booking [cite: 54, 55]
exports.deleteBooking = async (req, res) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.bookingId);
        if (!deleted) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
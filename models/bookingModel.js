const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, // [cite: 30]
    carNumber: { type: String, required: true }, // [cite: 31]
    startDate: { type: Date, required: true }, // [cite: 32]
    endDate: { type: Date, required: true }, // [cite: 33]
    totalAmount: { type: Number } // [cite: 34]
});

module.exports = mongoose.model('Booking', bookingSchema); // [cite: 43]
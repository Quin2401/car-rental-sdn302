const Car = require('../models/carModel');
const Booking = require('../models/bookingModel');

// Hiển thị trang chủ (Danh sách xe & Danh sách đặt xe)
exports.getHomePage = async (req, res) => {
    try {
        const cars = await Car.find();
        const bookings = await Booking.find();
        res.render('home', { cars, bookings });
    } catch (err) {
        res.status(500).send("Lỗi tải trang");
    }
};

// Hiển thị form đặt xe cho một chiếc xe cụ thể
exports.getBookingForm = async (req, res) => {
    try {
        const car = await Car.findOne({ carNumber: req.params.carNumber });
        if (!car) return res.redirect('/');
        res.render('booking-form', { car, error: null });
    } catch (err) {
        res.status(500).send("Lỗi tải trang");
    }
};

// Xử lý khi người dùng bấm "Submit" trên form
exports.submitBooking = async (req, res) => {
    try {
        const { customerName, carNumber, startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const car = await Car.findOne({ carNumber });

        if (start >= end) {
            return res.render('booking-form', { car, error: "Ngày trả xe phải sau ngày nhận xe!" });
        }

        const conflict = await Booking.findOne({
            carNumber,
            $or: [{ startDate: { $lt: end }, endDate: { $gt: start } }]
        });

        if (conflict) {
            return res.render('booking-form', { car, error: "Xe đã được đặt trong khoảng thời gian này!" });
        }

        const diffInDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
        const totalAmount = diffInDays * car.pricePerDay;

        const booking = new Booking({ customerName, carNumber, startDate: start, endDate: end, totalAmount });
        await booking.save();

        res.redirect('/'); // Thành công thì quay về trang chủ
    } catch (err) {
        res.status(500).send("Lỗi hệ thống");
    }
};
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Thêm CORS
const cookieParser = require('cookie-parser'); // Thêm Cookie Parser

const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/authRoutes'); // Route Auth

const app = express();

// --- CẤU HÌNH MIDDLEWARE ---
app.use(cors()); // Kích hoạt CORS cho phép mọi nguồn truy cập API
app.use(cookieParser()); // Kích hoạt đọc Cookie
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// --- DATABASE ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carRentalDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// --- ROUTES ---
app.use('/', authRoutes); // Đưa Auth lên trước
app.use('/', viewRoutes);
app.use('/cars', carRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 
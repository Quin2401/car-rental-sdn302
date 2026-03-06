const mongoose = require('mongoose');

// Định nghĩa Schema cho Xe (Car)
const carSchema = new mongoose.Schema({
    carNumber: { 
        type: String, 
        required: true, 
        unique: true // Biển số xe không được trùng nhau
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['available', 'rented', 'maintenance'], // Chỉ chấp nhận 3 trạng thái này [cite: 287]
        default: 'available' 
    },
    pricePerDay: { 
        type: Number, 
        required: true 
    },
    features: [String] // Mảng chứa các tính năng (VD: GPS, Bluetooth) [cite: 289]
});

// Xuất model để Controller sử dụng
module.exports = mongoose.model('Car', carSchema);
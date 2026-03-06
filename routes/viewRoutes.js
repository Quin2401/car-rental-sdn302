const express = require('express');
const router = express.Router();
const viewCtrl = require('../controllers/viewController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Thêm dòng này

router.get('/', viewCtrl.getHomePage);

// Phải đăng nhập mới được vào trang đặt xe và thực hiện đặt xe
router.get('/book/:carNumber', verifyToken, viewCtrl.getBookingForm);
router.post('/book', verifyToken, viewCtrl.submitBooking);

module.exports = router;
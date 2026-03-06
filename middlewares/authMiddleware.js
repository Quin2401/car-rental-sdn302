const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sdn302_secret_key'; // Khóa bí mật để ký JWT

exports.verifyToken = (req, res, next) => {
    // Đọc token từ cookie
    const token = req.cookies.jwt_token;

    if (!token) {
        // Nếu không có token, bắt quay lại trang đăng nhập
        return res.redirect('/login');
    }

    try {
        // Giải mã và xác thực token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Lưu thông tin user vào request để dùng sau này
        next(); // Cho phép đi tiếp
    } catch (err) {
        // Token sai hoặc hết hạn
        res.clearCookie('jwt_token');
        return res.redirect('/login');
    }
};
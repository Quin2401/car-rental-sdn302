const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'sdn302_secret_key';

// Hiện form Login & Register
exports.getLoginPage = (req, res) => res.render('login', { error: null });
exports.getRegisterPage = (req, res) => res.render('register', { error: null });

// Xử lý Đăng ký
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        
        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: "Username đã tồn tại hoặc có lỗi xảy ra!" });
    }
};

// Xử lý Đăng nhập
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { error: "Sai tên đăng nhập hoặc mật khẩu!" });
        }

        // Tạo JWT Token
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Lưu Token vào Cookie
        res.cookie('jwt_token', token, { httpOnly: true, maxAge: 3600000 }); // Sống 1 tiếng
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi server");
    }
};

// Đăng xuất
exports.logout = (req, res) => {
    res.clearCookie('jwt_token');
    res.redirect('/login');
};
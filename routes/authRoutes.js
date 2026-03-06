const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.get('/login', authCtrl.getLoginPage);
router.post('/login', authCtrl.login);
router.get('/register', authCtrl.getRegisterPage);
router.post('/register', authCtrl.register);
router.get('/logout', authCtrl.logout);

module.exports = router;
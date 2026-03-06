const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/carController');

router.get('/', carCtrl.getAllCars);
router.post('/', carCtrl.createCar);

module.exports = router;
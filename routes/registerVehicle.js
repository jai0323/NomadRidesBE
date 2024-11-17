const express = require('express');
const router = express.Router();
const { RegisterCar, RegisterBike } = require('../controllers/RegisterVehicleController');

// Route for customer KYC
router.put('/add-bike', RegisterBike);

// Route for vendor KYC
router.put('/add-car', RegisterCar);

module.exports = router;
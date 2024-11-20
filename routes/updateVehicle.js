const express = require('express');
const router = express.Router();
const {UpdateCar,UpdateBike } = require('../controllers/UpdateVehicleDetailsController');

// Route for customer KYC
router.post('/update-bike',UpdateBike);

// Route for vendor KYC
router.post('/update-car',UpdateCar);

module.exports = router;
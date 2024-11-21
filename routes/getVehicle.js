const express = require('express');
const router = express.Router();
const GetVehicleController = require('../controllers/GetVehicleController');

router.post('/',GetVehicleController);

module.exports = router;
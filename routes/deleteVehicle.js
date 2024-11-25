const express = require('express');
const router = express.Router();
const DeleteVehicleController = require('../controllers/DeleteVehicleContrller');

router.post('/',DeleteVehicleController.DeleteVehicle);

module.exports = router;
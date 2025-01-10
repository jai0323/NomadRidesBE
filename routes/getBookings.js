const express = require('express');
const router = express.Router();
const GetBookings = require('../controllers/GetBookings');

router.post('/',GetBookings);
module.exports = router;
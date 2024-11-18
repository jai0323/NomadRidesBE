const express = require('express')
const router = express.Router(); 

const VendorDashbroadController = require('../controllers/VendorDashbroadController');

router.post('/',VendorDashbroadController);
module.exports = router;
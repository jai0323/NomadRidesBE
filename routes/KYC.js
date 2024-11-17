const express = require('express');
const router = express.Router();
const { CustomerKYC, VendorKYC } = require('../controllers/KycController');

// Route for customer KYC
router.put('/customer', CustomerKYC);

// Route for vendor KYC
router.put('/vendor', VendorKYC);

module.exports = router;
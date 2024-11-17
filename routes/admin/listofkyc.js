const express = require('express');
const router = express.Router();
const GetListOFKycController = require('../../controllers/GetListOFKycController');

router.post('/',GetListOFKycController.GetListOFKyc);

module.exports = router;
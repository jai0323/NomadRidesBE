const express = require('express');
const router = express.Router();
const KycApprovalController = require('../../controllers/KycApproval');

router.post('/',KycApprovalController.KycApproval);

module.exports = router;
const express = require('express');
const router = express.Router();
const SignupController = require('../../controllers/SignupController');

router.post('/',SignupController.CustomerSignup);

module.exports = router;
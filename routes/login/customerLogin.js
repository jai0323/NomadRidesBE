const express = require('express');
const router = express.Router();
const LoginController = require('../../controllers/LoginController');

router.post('/',LoginController.CustomerLogin);

module.exports = router;
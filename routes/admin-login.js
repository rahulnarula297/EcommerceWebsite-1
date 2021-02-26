const express = require('express');

const router = express.Router();

const adminLoginPage = require('../controllers/admin-login.js');

router.get('/', adminLoginPage.loginPage);

module.exports = router;
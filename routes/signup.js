const express = require('express'); 

const router = express.Router();

const signupController = require('../controllers/signupPage_controller.js');

router.get('/', signupController.signUp);

module.exports = router;
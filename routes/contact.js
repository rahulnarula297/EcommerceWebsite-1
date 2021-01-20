const express = require('express'); 

const router = express.Router();

const contactPageController = require('../controllers/contactPage_controller.js');

router.get('/', contactPageController.contactPage);

module.exports = router;
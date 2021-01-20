const express = require('express');

const router = express.Router();

const productsPageController = require('../controllers/productsPage_controller.js');

router.get('/', productsPageController.productPage);

module.exports = router;
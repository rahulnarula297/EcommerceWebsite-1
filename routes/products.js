const express = require('express');

const router = express.Router();

const productsPageController = require('../controllers/productsPage_controller.js');

router.get('/:productsId', productsPageController.productPage);

module.exports = router;
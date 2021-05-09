const express = require('express');

const router = express.Router();

const productsPageController = require('../controllers/productsPage_controller.js');

router.get('/:productsId', productsPageController.productPage);
router.post('/like/:productId', productsPageController.likeController);

module.exports = router;
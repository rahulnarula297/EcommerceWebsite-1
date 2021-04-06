const express = require('express'); 

const router = express.Router();

const single_productPageController = require('../controllers/single-product.js');

router.get('/:productId', single_productPageController.single_productPage);

module.exports = router;
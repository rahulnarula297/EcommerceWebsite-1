const express = require('express'); 

const router = express.Router();

const single_productPageController = require('../controllers/single-product.js');
const place_orderController = require('../controllers/place_order.js');

router.get('/:productId', single_productPageController.single_productPage);
router.post('/userReview/:productId',single_productPageController.addReview); 
router.post('/verifyOrder/:productId',place_orderController.verifyOrder);
router.post('/confirmOTP/:productId',place_orderController.confirmOTP);
router.post('/placeOrder/:productId/:profileId',place_orderController.placeOrder);

module.exports = router;
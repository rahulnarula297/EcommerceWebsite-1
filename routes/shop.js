const express = require('express'); 

const router = express.Router();

const shopPageController = require('../controllers/shopPage_controller.js');

router.get('/', shopPageController.shopPage);
router.get('/categories/:profileId', shopPageController.categoryPage);
router.get('/reviews/:profileId/:reviewId', shopPageController.reviewPage);

module.exports = router;
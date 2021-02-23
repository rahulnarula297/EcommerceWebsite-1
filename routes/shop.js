const express = require('express'); 

const router = express.Router();

const shopPageController = require('../controllers/shopPage_controller.js');

router.get('/categories', shopPageController.categoryPage);

module.exports = router;
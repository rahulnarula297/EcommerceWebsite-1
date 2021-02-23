const express = require('express'); 

const router = express.Router();

const categoryPageController = require('../controllers/categoryPage_controller.js');

router.get('/', categoryPageController.categoryPage);

module.exports = router;
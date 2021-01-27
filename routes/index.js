const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);

router.use('/contact', require('./contact'));
router.use('/products', require('./products'));
router.use('/vendor', require('./vendor'));

module.exports = router;
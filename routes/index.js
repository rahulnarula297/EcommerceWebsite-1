const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);

router.use('/contact', require('./contact'));
router.use('/products', require('./products'));
router.use('/vendor', require('./vendor'));
router.use('/member-profile', require('./member-profile'));
router.use('/shop', require('./shop'));

module.exports = router;
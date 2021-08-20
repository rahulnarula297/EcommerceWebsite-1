const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/autocomplete', homeController.autocomplete);
router.post('/search', homeController.search);

router.use('/contact', require('./contact'));
router.use('/products', require('./products'));
router.use('/vendor', require('./vendor'));
router.use('/member-profile', require('./member-profile'));
router.use('/shop', require('./shop'));
router.use('/single-product', require('./single-product'));

module.exports = router;
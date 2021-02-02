const express = require('express');

const router = express.Router();

const vendorController = require('../controllers/vendorPage_controller');

router.get('/', vendorController.vendorPage);
router.post('/createProfile', vendorController.createProfile);
router.get('/addItem', vendorController.addtem);

module.exports = router;
const express = require('express');

const router = express.Router();

const passport = require('passport');

const vendorController = require('../controllers/vendorPage_controller');

router.get('/profile', passport.checkAuthenticated, vendorController.vendorPage);
router.get('/product', passport.checkAuthenticated, vendorController.vendorProducts);

router.post('/create', vendorController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/vendor/admin-login'
    }
), vendorController.createSession);

router.get('/sign-up', vendorController.signUp);
router.get('/admin-login', vendorController.signIn);  
router.get('/sign-out', vendorController.signOut);  

router.post('/createProfile', passport.checkAuthenticated, vendorController.createProfile);
router.post('/updateProfile/:id', passport.checkAuthenticated, vendorController.updateProfile);

router.get('/addItem', passport.checkAuthenticated, vendorController.addtem);
router.post('/addingItem',passport.checkAuthenticated,vendorController.addingItem);

router.get('/updateItem/:id', passport.checkAuthenticated, vendorController.updateItem);
router.post('/updatingItem/:id', passport.checkAuthenticated, vendorController.updatingItem);

router.get('/profile/remove-product/:id&:profile&:category', passport.checkAuthenticated,vendorController.removeProduct);
module.exports = router;

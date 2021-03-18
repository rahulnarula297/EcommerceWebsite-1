const express = require('express');

const router = express.Router();

const passport = require('passport');

const vendorController = require('../controllers/vendorPage_controller');

router.get('/profile', passport.checkAuthenticated, vendorController.vendorPage);

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

router.get('/addItem', passport.checkAuthenticated, vendorController.addtem);
router.post('/addingItem',passport.checkAuthenticated,vendorController.addingItem);

module.exports = router;
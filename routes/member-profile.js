const express = require('express');

const router = express.Router();

const memberProfilePage = require('../controllers/member-profile.js');

router.get('/', memberProfilePage.member_profile);

module.exports = router;
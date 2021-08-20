const express = require('express');

const router = express.Router();

const memberProfilePage = require('../controllers/member-profile.js');

router.get('/:profileId', memberProfilePage.get_profile);

module.exports = router;
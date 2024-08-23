const express = require('express');
const router = express.Router();
const channelPartnerController = require('../controllers/channelPartnersController');

router.post('/create', channelPartnerController.PostChannelPartner);
router.get('/fetch', channelPartnerController.GetChannelPartner);

module.exports = router;
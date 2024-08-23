const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leadsController');

// Create a new lead
router.post('/create', leadsController.NewLead);
router.get('/filter', leadsController.Filtering);
router.get('/csv', leadsController.createCSV);
router.get('/fetch', leadsController.GetAllLeads);

module.exports = router;

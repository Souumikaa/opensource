const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// Route to report a new incident
router.post('/report', incidentController.reportIncident);

// Route to get all reported incidents (only accessible by authorized users)
router.get('/all', incidentController.getAllIncidents);

// Route to get a specific incident by its ID
router.get('/:incidentId', incidentController.getIncidentById);

// Route to update an incident (only accessible by authorized users)
router.put('/:incidentId', incidentController.updateIncident);

// Route to delete an incident (only accessible by authorized users)
router.delete('/:incidentId', incidentController.deleteIncident);

module.exports = router;

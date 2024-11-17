const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Route to report an incident location
router.post('/report', locationController.reportIncidentLocation);

// Route to get all reported incident locations
router.get('/all', locationController.getAllReportedLocations);

// Route to get a specific incident location by its ID
router.get('/:locationId', locationController.getLocationById);

// Route to update a specific incident location
router.put('/:locationId', locationController.updateLocation);

// Route to delete a specific incident location
router.delete('/:locationId', locationController.deleteLocation);

module.exports = router;

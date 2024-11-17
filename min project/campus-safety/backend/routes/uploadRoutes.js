const express = require('express');
const router = express.Router();
const { handleUpload } = require('../controllers/uploadController'); // Importing the file upload controller

// Define the route for file uploads
// This will handle POST requests to /api/uploads/upload
router.post('/upload', handleUpload);

module.exports = router;

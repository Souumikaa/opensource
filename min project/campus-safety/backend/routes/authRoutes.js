const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user registration
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

// Route to get the current logged-in user's data (protected)
router.get('/me', authController.getCurrentUser);

// Route to check if the user is authenticated (protected)
router.get('/verify', authController.verifyToken);

module.exports = router;

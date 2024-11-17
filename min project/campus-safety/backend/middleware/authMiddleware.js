const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming you have a User model that handles user data

// Middleware to check if the user is authenticated (using JWT)
const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming token is sent in the 'Authorization' header as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Secret key for JWT (make sure to store it in .env)

        // Attach user information to the request object (useful for later middleware or route handlers)
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

// Middleware to check if the user is an admin (optional, if you want admin-only access to certain routes)
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = { isAuthenticated, isAdmin };

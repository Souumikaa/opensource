const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT authentication

// Sample user data (this can be replaced with a real database or file-based storage)
let users = []; // In-memory users storage for simplicity

// Secret key for JWT (you should move this to a secure environment variable in production)
const JWT_SECRET = 'your-secret-key';

/**
 * Register a new user.
 */
exports.register = (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password.' });
        }

        // Store the user (replace this with a real database)
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully.' });
    });
};

/**
 * Login an existing user.
 */
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare the entered password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Error comparing passwords.' });
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token: token
        });
    });
};

/**
 * Middleware to protect routes requiring authentication.
 */
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }

        req.user = decoded;
        next();
    });
};

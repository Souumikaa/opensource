// In-memory user data store (Replace this with a database model for production)
let users = [];

/**
 * Create a new user.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns {Object} The created user object
 */
exports.createUser = (username, email, password, role) => {
    // Create a new user object
    const newUser = {
        id: users.length + 1, // Simple ID generation based on array length
        username,
        email,
        password, // In real application, hash the password before storing
        role: role || 'user',  // Default role is 'user'
        createdAt: new Date(),
    };

    // Store the new user in the "database"
    users.push(newUser);

    return newUser;
};

/**
 * Find a user by ID.
 * @param {number} userId
 * @returns {Object|null} User object or null if not found
 */
exports.getUserById = (userId) => {
    return users.find(user => user.id === userId) || null;
};

/**
 * Find a user by email.
 * @param {string} email
 * @returns {Object|null} User object or null if not found
 */
exports.getUserByEmail = (email) => {
    return users.find(user => user.email === email) || null;
};

/**
 * Update user information.
 * @param {number} userId
 * @param {Object} updates
 * @returns {Object|null} Updated user object or null if not found
 */
exports.updateUser = (userId, updates) => {
    const user = users.find(user => user.id === userId);

    if (!user) {
        return null;
    }

    // Update user information
    Object.assign(user, updates);
    return user;
};

/**
 * Delete a user by ID.
 * @param {number} userId
 * @returns {boolean} Returns true if user was deleted, otherwise false
 */
exports.deleteUser = (userId) => {
    const index = users.findIndex(user => user.id === userId);

    if (index === -1) {
        return false;
    }

    users.splice(index, 1);
    return true;
};

/**
 * Validate user credentials (email and password).
 * @param {string} email
 * @param {string} password
 * @returns {Object|null} User object if credentials are valid, otherwise null
 */
exports.validateCredentials = (email, password) => {
    const user = users.find(user => user.email === email);

    // Here, in a real application, you would hash the password and compare
    if (user && user.password === password) {
        return user;
    }

    return null;
};

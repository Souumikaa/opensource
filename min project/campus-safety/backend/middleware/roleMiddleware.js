// Middleware to check the user's role
const checkRole = (roles) => {
    return (req, res, next) => {
        // Make sure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized, user not authenticated' });
        }

        // Check if the user's role is in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden, you do not have the necessary permissions' });
        }

        // Proceed if role is valid
        next();
    };
};

module.exports = { checkRole };

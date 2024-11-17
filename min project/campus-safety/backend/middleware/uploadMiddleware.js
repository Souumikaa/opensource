const multer = require('multer');
const path = require('path');

// Configure storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set destination folder for file uploads
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate a unique file name based on the current timestamp and original file name
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File upload filter to allow only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
    // Allowed file types (image/png, image/jpeg, etc.)
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);  // Allow the file
    } else {
        cb(new Error('Only image files are allowed'), false);  // Reject the file
    }
};

// Initialize multer with the storage configuration and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Max file size: 5MB
    }
}).single('file'); // 'file' is the name of the file input field in your HTML form

module.exports = upload;

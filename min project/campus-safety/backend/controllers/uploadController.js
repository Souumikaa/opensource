const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configure storage settings for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        
        // Ensure the uploads folder exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        
        cb(null, uploadPath); // Set the destination for the uploaded files
    },
    filename: (req, file, cb) => {
        // Set the filename format (e.g., incident_id + file extension)
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    }
});

// Multer file upload middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Max file size of 10 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('File type not allowed'), false); // Reject file if not allowed
        }
    }
}).single('attachment'); // Field name for the file input is 'attachment'

// Handle file upload
const handleUpload = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err.message });
        }

        // If upload is successful, return the file details (URL or filename)
        const fileUrl = `/uploads/${req.file.filename}`;
        return res.status(200).json({
            message: 'File uploaded successfully',
            attachmentUrl: fileUrl, // Send back the URL or path of the uploaded file
        });
    });
};

// Export the upload handler
module.exports = { handleUpload };

// server.js
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const locationRoutes = require('./routes/locationRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Setup for Socket.io

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());  // JSON body parser
app.use(cors());  // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));  // For file uploads

// Static file serving for uploaded files (for images and documents)
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);  // Create uploads folder if not exists
}
app.use('/uploads', express.static(uploadsPath));

// Socket.io connection for real-time notifications
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware for uploads and other issues
app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Server error' });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

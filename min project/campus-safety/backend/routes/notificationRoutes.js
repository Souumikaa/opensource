const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to send a new notification
router.post('/send', notificationController.sendNotification);

// Route to get all notifications (accessible to admins or authorized users)
router.get('/all', notificationController.getAllNotifications);

// Route to get a specific notification by its ID
router.get('/:notificationId', notificationController.getNotificationById);

// Route to delete a specific notification by its ID
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;

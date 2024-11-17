// In-memory array to store notifications (you can later replace this with a database)
let notifications = [];

/**
 * Create a new notification.
 */
exports.createNotification = (req, res) => {
    const { message, type, userId } = req.body;

    // Validate that all required fields are provided
    if (!message || !type || !userId) {
        return res.status(400).json({ message: 'Message, type, and userId are required.' });
    }

    // Create a new notification object
    const newNotification = {
        id: notifications.length + 1,  // Simple ID generation based on the array length
        message,
        type,
        userId, // Targeted user for the notification
        createdAt: new Date(),
    };

    // Store the notification (replace this with database logic in production)
    notifications.push(newNotification);

    // Respond with the success message and the newly created notification
    res.status(201).json({
        message: 'Notification created successfully.',
        notification: newNotification,
    });
};

/**
 * Get all notifications.
 */
exports.getAllNotifications = (req, res) => {
    // Return all notifications
    res.status(200).json({
        notifications,
    });
};

/**
 * Get notifications for a specific user by userId.
 */
exports.getNotificationsByUserId = (req, res) => {
    const { userId } = req.params;

    // Filter the notifications for the given userId
    const userNotifications = notifications.filter(notification => notification.userId === userId);

    if (userNotifications.length === 0) {
        return res.status(404).json({ message: 'No notifications found for this user.' });
    }

    // Return the notifications for the specified user
    res.status(200).json({
        notifications: userNotifications,
    });
};

/**
 * Delete a notification by ID.
 */
exports.deleteNotification = (req, res) => {
    const { id } = req.params;

    // Find the index of the notification to delete
    const index = notifications.findIndex(notification => notification.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Notification not found.' });
    }

    // Remove the notification from the array
    notifications.splice(index, 1);

    // Respond with a success message
    res.status(200).json({ message: 'Notification deleted successfully.' });
};

/**
 * Update a notification's status (e.g., read/unread).
 */
exports.updateNotificationStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // expected status: 'read' or 'unread'

    if (!status || (status !== 'read' && status !== 'unread')) {
        return res.status(400).json({ message: 'Invalid status. Valid statuses are "read" or "unread".' });
    }

    // Find the notification to update
    const notification = notifications.find(notification => notification.id === parseInt(id));

    if (!notification) {
        return res.status(404).json({ message: 'Notification not found.' });
    }

    // Update the notification status
    notification.status = status;

    // Respond with the updated notification
    res.status(200).json({
        message: 'Notification status updated successfully.',
        notification,
    });
};

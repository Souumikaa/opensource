// In-memory array to store locations (You can replace this with a database in production)
let locations = [];

/**
 * Add a new location (e.g., emergency exit, incident location).
 */
exports.addLocation = (req, res) => {
    const { name, latitude, longitude, type } = req.body;

    // Validate that all required fields are provided
    if (!name || !latitude || !longitude || !type) {
        return res.status(400).json({ message: 'Name, latitude, longitude, and type are required.' });
    }

    // Create a new location object
    const newLocation = {
        id: locations.length + 1,  // Simple ID generation based on array length
        name,
        latitude,
        longitude,
        type, // Type can be 'emergency_exit', 'incident', etc.
        createdAt: new Date(),
    };

    // Store the location (replace with database logic in production)
    locations.push(newLocation);

    // Respond with the success message and the newly created location
    res.status(201).json({
        message: 'Location added successfully.',
        location: newLocation,
    });
};

/**
 * Get all locations.
 */
exports.getAllLocations = (req, res) => {
    // Return all locations
    res.status(200).json({
        locations,
    });
};

/**
 * Get locations by type (e.g., get only emergency exits).
 */
exports.getLocationsByType = (req, res) => {
    const { type } = req.params;

    // Filter the locations for the given type (e.g., 'emergency_exit')
    const filteredLocations = locations.filter(location => location.type === type);

    if (filteredLocations.length === 0) {
        return res.status(404).json({ message: 'No locations found for this type.' });
    }

    // Return the filtered locations
    res.status(200).json({
        locations: filteredLocations,
    });
};

/**
 * Get a location by its ID.
 */
exports.getLocationById = (req, res) => {
    const { id } = req.params;

    // Find the location by its ID
    const location = locations.find(location => location.id === parseInt(id));

    if (!location) {
        return res.status(404).json({ message: 'Location not found.' });
    }

    // Return the location
    res.status(200).json({
        location,
    });
};

/**
 * Delete a location by ID.
 */
exports.deleteLocation = (req, res) => {
    const { id } = req.params;

    // Find the index of the location to delete
    const index = locations.findIndex(location => location.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Location not found.' });
    }

    // Remove the location from the array
    locations.splice(index, 1);

    // Respond with a success message
    res.status(200).json({ message: 'Location deleted successfully.' });
};

/**
 * Update a location by ID.
 */
exports.updateLocation = (req, res) => {
    const { id } = req.params;
    const { name, latitude, longitude, type } = req.body;

    // Validate the input
    if (!name || !latitude || !longitude || !type) {
        return res.status(400).json({ message: 'Name, latitude, longitude, and type are required.' });
    }

    // Find the location by ID
    const location = locations.find(location => location.id === parseInt(id));

    if (!location) {
        return res.status(404).json({ message: 'Location not found.' });
    }

    // Update the location details
    location.name = name;
    location.latitude = latitude;
    location.longitude = longitude;
    location.type = type;

    // Respond with the updated location
    res.status(200).json({
        message: 'Location updated successfully.',
        location,
    });
};

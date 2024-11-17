const fs = require('fs');
const path = require('path');

// File path for storing locations data (simulate a database)
const locationsFilePath = path.join(__dirname, '../data/locations.json');

// Read locations from the file
const readLocations = () => {
    try {
        const data = fs.readFileSync(locationsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Write locations to the file
const writeLocations = (locations) => {
    try {
        fs.writeFileSync(locationsFilePath, JSON.stringify(locations, null, 2));
    } catch (err) {
        console.error('Error writing locations to file', err);
    }
};

// Create a new incident location
exports.createLocation = (locationData) => {
    const locations = readLocations();
    const newLocation = { id: Date.now().toString(), ...locationData };
    locations.push(newLocation);
    writeLocations(locations);
    return newLocation;
};

// Get all reported locations
exports.getAllLocations = () => {
    return readLocations();
};

// Get a specific location by ID
exports.getLocationById = (id) => {
    const locations = readLocations();
    return locations.find(location => location.id === id);
};

// Update a location by ID
exports.updateLocation = (id, updatedData) => {
    const locations = readLocations();
    const index = locations.findIndex(location => location.id === id);
    if (index !== -1) {
        locations[index] = { ...locations[index], ...updatedData };
        writeLocations(locations);
        return locations[index];
    }
    return null;
};

// Delete a location by ID
exports.deleteLocation = (id) => {
    let locations = readLocations();
    locations = locations.filter(location => location.id !== id);
    writeLocations(locations);
};

// In-memory array to store incidents (replace this with a real database in production)
let incidents = [];

/**
 * Report a new incident.
 */
exports.reportIncident = (req, res) => {
    const { incidentType, description } = req.body;

    // Basic validation to check if all required fields are provided
    if (!incidentType || !description) {
        return res.status(400).json({ message: 'Incident type and description are required.' });
    }

    // Create a new incident object
    const newIncident = {
        id: incidents.length + 1, // Simple ID generation based on the current array length
        incidentType,
        description,
        reportedAt: new Date(),
    };

    // Save the incident (replace this with a database insert operation)
    incidents.push(newIncident);

    // Respond with a success message and the new incident data
    res.status(201).json({
        message: 'Incident reported successfully.',
        incident: newIncident,
    });
};

/**
 * Get all reported incidents.
 */
exports.getAllIncidents = (req, res) => {
    // Return the list of all incidents
    res.status(200).json({
        incidents,
    });
};

/**
 * Get a specific incident by ID.
 */
exports.getIncidentById = (req, res) => {
    const { id } = req.params;

    // Find the incident by ID
    const incident = incidents.find(incident => incident.id === parseInt(id));

    if (!incident) {
        return res.status(404).json({ message: 'Incident not found.' });
    }

    // Return the found incident
    res.status(200).json({
        incident,
    });
};

/**
 * Delete an incident by ID.
 */
exports.deleteIncident = (req, res) => {
    const { id } = req.params;

    // Find the index of the incident to delete
    const index = incidents.findIndex(incident => incident.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Incident not found.' });
    }

    // Remove the incident from the array
    incidents.splice(index, 1);

    // Respond with success message
    res.status(200).json({ message: 'Incident deleted successfully.' });
};

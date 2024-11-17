// In-memory storage for incidents (replace with a database model for production)
let incidents = [];

/**
 * Create a new incident report.
 * @param {number} userId - The ID of the user reporting the incident
 * @param {string} type - Type of incident (e.g., "Theft", "Fire", "Accident")
 * @param {string} description - Detailed description of the incident
 * @param {string} location - Location of the incident
 * @param {Date} dateReported - The date the incident was reported
 * @returns {Object} The created incident object
 */
exports.createIncident = (userId, type, description, location, dateReported) => {
    const newIncident = {
        id: incidents.length + 1, // Simple ID generation based on array length
        userId, // The user who reported the incident
        type,
        description,
        location,
        dateReported: dateReported || new Date(),
        status: 'Open', // Default status is 'Open'
        createdAt: new Date(),
    };

    // Store the new incident
    incidents.push(newIncident);
    return newIncident;
};

/**
 * Get all incidents.
 * @returns {Array} A list of all incidents
 */
exports.getAllIncidents = () => {
    return incidents;
};

/**
 * Get an incident by its ID.
 * @param {number} incidentId
 * @returns {Object|null} The incident object or null if not found
 */
exports.getIncidentById = (incidentId) => {
    return incidents.find(incident => incident.id === incidentId) || null;
};

/**
 * Update the status of an incident (e.g., resolve, close).
 * @param {number} incidentId
 * @param {string} newStatus - The new status (e.g., "Resolved", "Closed")
 * @returns {Object|null} Updated incident object or null if not found
 */
exports.updateIncidentStatus = (incidentId, newStatus) => {
    const incident = incidents.find(incident => incident.id === incidentId);
    if (!incident) {
        return null;
    }

    // Update the incident status
    incident.status = newStatus;
    return incident;
};

/**
 * Delete an incident by its ID.
 * @param {number} incidentId
 * @returns {boolean} Returns true if the incident was deleted, otherwise false
 */
exports.deleteIncident = (incidentId) => {
    const index = incidents.findIndex(incident => incident.id === incidentId);
    if (index === -1) {
        return false;
    }

    incidents.splice(index, 1);
    return true;
};

// app.js

// Initialize socket connection with the server
const socket = io('http://localhost:5000');  // Adjust URL if necessary

// Listen for real-time notifications (new incidents)
socket.on('new-incident', (data) => {
    // Display a notification for a new incident
    alert(data.message);  // Optionally, you can show a custom notification on the UI.
    console.log('New Incident:', data);

    // Example: Dynamically update the page with the new incident details
    const incidentsContainer = document.getElementById('incidentsContainer');
    const newIncident = document.createElement('div');
    newIncident.classList.add('incident');
    newIncident.innerHTML = `
        <strong>${data.type}</strong>
        <p>${data.description}</p>
        <a href="${data.attachmentUrl}" target="_blank">View Attachment</a>
    `;
    incidentsContainer.appendChild(newIncident);
});

// Handle the incident form submission
document.getElementById('incidentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = document.getElementById('incidentType').value;
    const description = document.getElementById('description').value;
    const attachment = document.getElementById('attachment').files[0];

    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    if (attachment) formData.append('attachment', attachment);

    try {
        // Send the incident data to the server via POST request
        const response = await fetch('/api/incidents/report', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        alert(data.message); // Show success message

        // Emit a real-time notification after a successful report
        if (data.status === 'success') {
            socket.emit('new-incident', {
                message: `New incident reported: ${type}`,
                type,
                description,
                attachmentUrl: data.attachmentUrl || '',
            });
        }
    } catch (error) {
        console.error('Error reporting incident:', error);
        alert('Error reporting incident. Please try again.');
    }
});

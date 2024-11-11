// Handle incident report form submission
document.getElementById('incidentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const incidentType = document.getElementById('incidentType').value;
    const description = document.getElementById('description').value;

    // Display confirmation message
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = Thank you for your report! <br> Incident Type: ${incidentType} <br> Description: ${description};
    responseMessage.style.display = 'block';

    // Reset form
    document.getElementById('incidentForm').reset();
});
// Real-time notifications (socket.io)
const socket = io('http://localhost:5000'); // Server URL for socket connection

socket.on('new-incident', (data) => {
    alert(data.message); // Display real-time notifications for incidents
    // Optionally, update the page with the incident details dynamically
});

// Incident form submission (AJAX request)
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
        const response = await fetch('/api/incidents/report', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        alert(data.message); // Show success message
    } catch (error) {
        console.error('Error reporting incident:', error);
    }
});

// Google Maps API integration
document.getElementById('showRouteButton').addEventListener('click', function() {
    document.getElementById('mapContainer').style.display = 'block';
    initMap(); // Initialize the map and route
});

function initMap() {
    const start = { lat: 12.9716, lng: 77.5946 }; // Sample: Bangalore coordinates
    const end = { lat: 12.9750, lng: 77.6100 }; // Sample destination coordinates

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: start,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}

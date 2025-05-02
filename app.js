// Connect to Socket.IO server
const socket = io();

// Get DOM elements
const turbidityElement = document.getElementById('turbidity');
const tdsElement = document.getElementById('tds');
const turbidityHistory = document.getElementById('turbidity-history').getElementsByTagName('tbody')[0];
const tdsHistory = document.getElementById('tds-history').getElementsByTagName('tbody')[0];

// Maximum number of history entries to display
const MAX_HISTORY = 10;

// Function to add data to history table
function addToHistory(table, value, unit) {
    const row = table.insertRow(0);
    const timeCell = row.insertCell(0);
    const valueCell = row.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    valueCell.textContent = `${value.toFixed(2)} ${unit}`;
    
    // Remove oldest entry if exceeding max history
    if (table.rows.length > MAX_HISTORY) {
        table.deleteRow(table.rows.length - 1);
    }
}

// Listen for sensor data updates
socket.on('sensorData', (data) => {
    // Update current values with 2 decimal places
    turbidityElement.textContent = data.turbidity.toFixed(2);
    tdsElement.textContent = data.tds.toFixed(2);
    
    // Add to history tables
    addToHistory(turbidityHistory, data.turbidity, 'NTU');
    addToHistory(tdsHistory, data.tds, 'ppm');
    
    // Add visual feedback for value updates
    turbidityElement.classList.add('updated');
    tdsElement.classList.add('updated');
    
    // Remove the visual feedback after animation
    setTimeout(() => {
        turbidityElement.classList.remove('updated');
        tdsElement.classList.remove('updated');
    }, 1000);
});

// Add error handling for socket connection
// Handle various error types
socket.on('error', (error) => {
    console.error('Server error:', error);
    turbidityElement.textContent = 'Error: ' + error.message;
    tdsElement.textContent = 'Error: ' + error.message;
    
    // Add error styling
    turbidityElement.classList.add('error');
    tdsElement.classList.add('error');
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    turbidityElement.textContent = 'Connection Error';
    tdsElement.textContent = 'Connection Error';
    
    // Add error styling
    turbidityElement.classList.add('error');
    tdsElement.classList.add('error');
});

// Add reconnection handling
socket.on('reconnect', (attemptNumber) => {
    console.log('Reconnected after', attemptNumber, 'attempts');
    turbidityElement.textContent = 'Loading...';
    tdsElement.textContent = 'Loading...';
});
  
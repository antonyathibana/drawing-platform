// Initialize Socket.IO connection
const socket = io();

// DOM elements
const homePage = document.getElementById('homePage');
const drawingPage = document.getElementById('drawingPage');
const roomCodeInput = document.getElementById('roomCode');
const joinBtn = document.getElementById('joinBtn');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const backBtn = document.getElementById('backBtn');
const currentRoomSpan = document.getElementById('currentRoom');
const displayRoomSpan = document.getElementById('displayRoom');
const connectionStatus = document.getElementById('connectionStatus');

// Canvas setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Drawing state variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentRoom = null;
let isReceivingDrawing = false;

// Canvas configuration
canvas.width = 800;
canvas.height = 500;

// Drawing styles
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 2;
ctx.strokeStyle = '#2d3748';

// ========================================
// SOCKET.IO EVENT HANDLERS
// ========================================

// Handle successful room joining
socket.on('joined-room', (roomCode) => {
    currentRoom = roomCode;
    showDrawingPage();
    connectionStatus.textContent = 'Connected';
    connectionStatus.style.color = '#48bb78';
});

// Handle receiving drawing data from other users
socket.on('drawing', (data) => {
    // Draw the received line on canvas
    drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.lineWidth);
});

// Handle canvas clearing command
socket.on('clear-canvas', () => {
    clearCanvasLocal();
});

// Handle disconnection
socket.on('disconnect', () => {
    connectionStatus.textContent = 'Disconnected';
    connectionStatus.style.color = '#f56565';
});

// ========================================
// UI FUNCTIONS
// ========================================

// Show the home page
function showHomePage() {
    homePage.classList.remove('hidden');
    drawingPage.classList.add('hidden');
    currentRoom = null;
    roomCodeInput.value = '';
}

// Show the drawing page
function showDrawingPage() {
    homePage.classList.add('hidden');
    drawingPage.classList.remove('hidden');
    currentRoomSpan.textContent = currentRoom;
    displayRoomSpan.textContent = currentRoom;
    
    // Set up canvas event listeners
    setupCanvasEvents();
}

// ========================================
// ROOM MANAGEMENT
// ========================================

// Join a room with the provided code
function joinRoom() {
    const roomCode = roomCodeInput.value.trim();
    
    // Validate room code
    if (!roomCode || roomCode.length !== 6 || !/^\d{6}$/.test(roomCode)) {
        alert('Please enter a valid 6-digit room code!');
        return;
    }
    
    // Join the room
    socket.emit('join-room', roomCode);
}

// Generate a random 6-digit room code
function generateRoomCode() {
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
    roomCodeInput.value = roomCode;
}

// Go back to home page
function goBack() {
    // Disconnect from current room
    socket.disconnect();
    
    // Show home page
    showHomePage();
    
    // Reconnect socket
    socket.connect();
    
    // Clear canvas
    clearCanvasLocal();
}

// ========================================
// CANVAS DRAWING FUNCTIONS
// ========================================

// Set up canvas event listeners for drawing
function setupCanvasEvents() {
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile support
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Prevent scrolling when touching canvas
    canvas.addEventListener('touchstart', (e) => e.preventDefault());
    canvas.addEventListener('touchmove', (e) => e.preventDefault());
}

// Start drawing when mouse button is pressed
function startDrawing(e) {
    if (!currentRoom) return;
    
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    
    // Get mouse position relative to canvas
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
}

// Draw line while mouse is moving
function draw(e) {
    if (!isDrawing || !currentRoom) return;
    
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    // Draw locally
    drawLine(lastX, lastY, currentX, currentY);
    
    // Send drawing data to server
    socket.emit('drawing', {
        room: currentRoom,
        x0: lastX,
        y0: lastY,
        x1: currentX,
        y1: currentY,
        color: ctx.strokeStyle,
        lineWidth: ctx.lineWidth
    });
    
    // Update last position
    lastX = currentX;
    lastY = currentY;
}

// Stop drawing when mouse button is released
function stopDrawing() {
    isDrawing = false;
}

// Handle touch events for mobile drawing
function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Draw a line on the canvas
function drawLine(x0, y0, x1, y1, color = '#2d3748', lineWidth = 2) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
}

// Clear the canvas
function clearCanvas() {
    if (!currentRoom) return;
    
    // Clear locally
    clearCanvasLocal();
    
    // Notify other users in the room
    socket.emit('clear-canvas', currentRoom);
}

// Clear canvas locally
function clearCanvasLocal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Optional: Add a white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ========================================
// EVENT LISTENERS FOR BUTTONS
// ========================================

// Handle Enter key press in room code input
roomCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinRoom();
    }
});

// Allow only numbers in room code input
roomCodeInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// ========================================
// INITIALIZATION
// ========================================

// Initialize the application
function init() {
    // Set initial status
    connectionStatus.textContent = 'Not connected';
    connectionStatus.style.color = '#a0aec0';
    
    // Set up responsive canvas
    setupResponsiveCanvas();
}

// Set up responsive canvas size
function setupResponsiveCanvas() {
    function resizeCanvas() {
        const container = canvas.parentElement;
        const maxWidth = Math.min(container.clientWidth - 20, 800);
        const maxHeight = Math.min(window.innerHeight * 0.5, 500);
        
        // Maintain aspect ratio
        const aspectRatio = 800 / 500;
        let newWidth = maxWidth;
        let newHeight = maxWidth / aspectRatio;
        
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }
        
        canvas.width = newWidth;
        canvas.height = newHeight;
    }
    
    // Initial resize
    resizeCanvas();
    
    // Resize on window change
    window.addEventListener('resize', resizeCanvas);
}

// Start the application when page loads
document.addEventListener('DOMContentLoaded', init);

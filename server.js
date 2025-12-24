const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user joining a room
    socket.on('join-room', (roomCode) => {
        socket.join(roomCode);
        console.log(`User ${socket.id} joined room: ${roomCode}`);
        
        // Notify the user they joined successfully
        socket.emit('joined-room', roomCode);
    });

    // Handle drawing data from clients
    socket.on('drawing', (data) => {
        // Broadcast the drawing data to all other users in the same room
        socket.broadcast.to(data.room).emit('drawing', data);
    });

    // Handle canvas clearing
    socket.on('clear-canvas', (roomCode) => {
        // Broadcast clear command to all users in the room except the sender
        socket.broadcast.to(roomCode).emit('clear-canvas');
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});



// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const { Server } = require('socket.io')
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "chess-sand-nine.vercel.app",
      methods: ["GET", "POST"],
    },
});

server.listen(443, () => {
    console.log("SERVER IS RUNNING");
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
});

// Creating a room
io.on('connection', (socket) => {
    socket.on('hostGame', (roomNumber) => {
        socket.join(roomNumber);
        socket.emit('roomCreated', roomNumber);
    });
});


// Joining a room
io.on('connection', (socket) => {
    socket.on('joinRoom', (roomNumber) => {
        socket.join(roomNumber);
    });
});

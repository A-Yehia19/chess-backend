const { Server } = require('socket.io')
const cors = require("cors");
const express = require("express");
const http = require("http");
require('dotenv').config();
const sendMessage = require("./utils/send_message").sendMessage;


const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_HOST, "http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(`User with ID: ${socket.id} sent message: ${data.message}`);
  });
});

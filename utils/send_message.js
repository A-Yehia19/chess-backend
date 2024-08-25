function sendMessage (socket, message, room) {
    socket.emit("send_message", { message, room });
};

module.exports = { sendMessage };

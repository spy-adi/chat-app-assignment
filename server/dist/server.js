"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and types
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
// Create an Express application
const app = (0, express_1.default)();
// Create an HTTP server using Express
const server = http_1.default.createServer(app);
// Enable CORS
app.use((0, cors_1.default)());
// Create a Socket.IO server and pass the HTTP server as a parameter
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173/",
        methods: ["GET", "POST"],
    },
});
// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // Handle joining a room
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    // Handle sending a message
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
// Catch-all route to serve index.html
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
// Start the server on port 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

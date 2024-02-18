// Import necessary modules and types
import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import path from "path"
import { Server as SocketIOServer, Socket } from "socket.io";

// Create an Express application
const app: Application = express();

// Create an HTTP server using Express
const server: http.Server = http.createServer(app);

// Enable CORS
app.use(cors());

// Create a Socket.IO server and pass the HTTP server as a parameter
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle Socket.IO connections
io.on("connection", (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join_room", (data: { room: string, username: string }) => {
    socket.join(data.room);
    console.log(`User with ID: ${socket.id} joined room: ${data.room}`);

    // Greet the user
    io.to(data.room).emit("receive_message", {
      room: data.room,
      message: `${data.username} has joined the chat!`,
    });
  });

  // Handle sending a message
  socket.on("send_message", (data: { room: string; message: string }) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);

    // Get the rooms the user is currently in
    const rooms = Object.keys(socket.rooms);

    // Inform each room about the user's departure
    rooms.forEach(room => {
      socket.to(room).emit("receive_message", {
        room,
        message: `${socket.id} has left the chat.`,
      });
    });
  });
});

// Serve static files
app.use(express.static(path.join('..', 'client', 'dist')));

// Catch-all route to serve index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist'));
});

// Start the server on port 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

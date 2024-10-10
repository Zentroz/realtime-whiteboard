import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { idGenerator } from './utils/utilsMethods.js';
import { configDotenv } from 'dotenv';

const rooms = [];
configDotenv();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

io.on('connection', (socket) => {
  socket.on("register-room", (data) => {
    const room = rooms.findIndex((rm) => rm.name == data.name);
    if (room != -1) { socket.emit("error-response", { success: false, message: "Room already exists!" }) }
    else {
      const id = idGenerator();
      rooms.push({ id, ...data, members: [socket.id] });
      socket.emit("room-created", { success: true, roomId: id, message: "Room Created!" });
    }

  })

  socket.on("join-room", (data) => {
    const room = rooms.findIndex((rm) => rm.name == data.name && rm.password == data.password);
    if (room == -1) { socket.emit("error-response", { success: false, message: "Room not found!" }) }
    else {
      rooms[room].members.push(socket.id);
      socket.emit("room-joined", { success: true, roomId: rooms[room].id, message: "Room Connected!" });
    }
  })

  socket.on("leave-room", (data) => {
    const roomIndex = rooms.findIndex((room) => room.id == data);
    console.log(socket.id);
    console.log("Memebers Before:", rooms[roomIndex].members);
    const newMembers = rooms[roomIndex].members.filter((member) => member != socket.id);
    rooms[roomIndex].members = newMembers;
    socket.emit("room-left");
  })

  socket.on("start-shape", (data) => {
    const room = rooms.find((rm) => rm.id == data.roomId);
    const members = room.members;
    members.forEach(socketId => {
      socket.to(socketId).emit("start-shape", { x: data.x, y: data.y, tool: data.tool, lineOwner: socket.id });
    });
  })
  socket.on("draw-shape", (data) => {
    const room = rooms.find((rm) => rm.id == data.roomId);
    const members = room.members;
    members.forEach(socketId => {
      if (socketId != socket.id) {
        socket.to(socketId).emit("draw-shape", { x: data.x, y: data.y, tool: data.tool, lineOwner: socket.id });
      }
    });
  })
  socket.on("end-shape", (data) => {
    const room = rooms.find((rm) => rm.id == data.roomId);
    const members = room.members;
    members.forEach(socketId => {
      socket.to(socketId).emit("end-shape", { tool: data.tool, lineOwner: socket.id });
    });
  })
});

server.listen(3000);
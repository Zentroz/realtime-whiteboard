import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { idGenerator } from './utils/utilsMethods.js';

const rooms = [];

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

io.on('connection', (socket) => {
  socket.on("register-room", (data) => {
    const room = rooms.findIndex((rm) => rm.name == data.name);
    if (room != -1) { socket.emit("server-response", { success: false, message: "Room already exists!" }) }
    else {
      rooms.push({ id: idGenerator(), ...data, members: [socket.id] });
      const index = rooms.findIndex((rm) => rm.name == data.name);
      socket.emit("room-created", { success: true, roomId: rooms[index].id, message: "Room Created!" });
    }

  })

  socket.on("join-room", (data) => {
    const room = rooms.findIndex((rm) => rm.name == data.name && rm.password == data.password);
    if (room == -1) { socket.emit("server-response", { success: false, message: "Room not found!" }) }
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
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
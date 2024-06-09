import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReciverSocketId = (reciverId) => {
  return userOnlineMap[reciverId];
};

const userOnlineMap = {}; //{userid:socket.id}
io.on("connection", (socket) => {
  console.log("connect user");

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userOnlineMap[userId] = socket.id;

  //   get online users
  io.emit("getOnlineUsers", Object.keys(userOnlineMap));

  socket.on("disconnect", () => {
    console.log("disconnect user");
    delete userOnlineMap[userId];
    io.emit("getOnlineUsers", Object.keys(userOnlineMap));
  });
});
export { app, server, io };

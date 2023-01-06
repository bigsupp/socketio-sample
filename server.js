const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`socket.id=${socket.id} connected`);
  socket.on("joinRoom", (data, callback) => {
    const { roomId } = data;
    console.log(`socket.id=${socket.id} join room:`, roomId);
    socket.join(roomId);
    console.log(`socket.id=${socket.id} joined rooms:`, socket.rooms);
  });
});

app.set("socketio", io);

app.get("/hello", (req, res) => {
  const message = req.query.message || "test broadcast";
  io.emit("hello", message, () => {
    console.log("server emit to all; message:", message);
    res.send("sent");
  });
});

app.use("/form", require("./routes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

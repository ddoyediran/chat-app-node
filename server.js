// require("dotenv").config();

//const port = process.env.PORT || 3000;

const io = require("socket.io")(3000);

const users = {};

io.on("connection", (socket) => {
  //socket.emit("chat-message", "Hello world");

  // to display user name
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  // passed the message to the server
  socket.on("send-chat-message", (message) => {
    //console.log(message);
    // to emit to all clients connected
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  // disconnect user
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

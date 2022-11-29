// require("dotenv").config();

//const port = process.env.PORT || 3000;

const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  socket.emit("chat-message", "Hello world");
});

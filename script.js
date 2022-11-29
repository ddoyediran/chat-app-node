// require("dotenv").config();

// const port = process.env.PORT || 3000;

const socket = io("http://localhost:3000", { transports: ["websocket"] });

socket.on("chat-message", (data) => {
  console.log(data);
});

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", name);

// handle chat messages
socket.on("chat-message", (data) => {
  // console.log(data);
  appendMessage(`${data.name}: ${data.message}`);
});

// handle connected users
socket.on("user-connected", (name) => {
  // console.log(data);
  appendMessage(`${name} connected`);
});

// handle disconnected users
socket.on("user-connected", (name) => {
  // console.log(data);
  appendMessage(`${name} disconnected`);
});

// add event listener to the submit form
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the typed message
  const message = messageInput.value;

  appendMessage(`You ${message}`);
  // emit the message to socket
  socket.emit("send-chat-message", message);

  // clear the text input field
  messageInput.value = "";

  // console.log(message);
});

// HELPER Function to append message to display div
// INPUT: takes a single parameter which is the message idv
// OUTPUT: Return or append the message to a div
function appendMessage(message) {
  const messageElement = document.createElement("div"); // create a div

  messageElement.innerText = message; // add the message to div

  messageContainer.append(messageElement); // append the messageElement div to to the messageContainer div
}

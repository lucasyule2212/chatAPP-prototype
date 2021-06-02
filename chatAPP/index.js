const express = require("express");
const mainRoute = require("./routes/mainRoute");
require("dotenv").config();
const path = require("path");
const socketIO = require("socket.io");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT:${process.env.PORT}`);
});

const io = socketIO(server); //conectando o socket ao nosso server
const messages = []; // array que armazena mensagens
io.on("connection", (socket) => {
  //colocando o 'io' para sempre a uma nova conexao checar alguns parametros:
  socket.emit('update_messages',messages);//atualizando msgs para os novos users conectados
  socket.on("new_message", (data) => {
    //cada socket vai esperar dados no 'new_message'
    messages.push(data); //colocar a msg vinda do frontend no array de mensagens

    io.emit('update_messages',messages);//colocando o io(gerencia todos os sockets conectados) para emitir as mensagens a todos.
  });

});

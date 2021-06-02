require("dotenv").config();
const express = require("express");
const path = require("path");
const socketIO = require('socket.io');//import do socketIo
const mainRoute = require("./routes/mainRoute");
const app = express();


app.use("/",mainRoute);

const server = app.listen(process.env.PORT, () => {  //o app.listen retorna um server, que será utilizado pelo socketIO
  console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});

const io = socketIO(server);

io.on('connection',(socket)=>{ //o método 'on' funciona como um listener, que executa o bloco de código sempre que um evento(connection = navegador conectou com o socket) acontecer
      console.log("Aviso: New connection.");     //o método gera o 'socket', que é a conexao entre o frontend(navegador) e o backend(server) cada socket é indivitual
        socket.emit('hello',{msg:'Mensagem do back para o front!'})  //o método socket.'emit', manda uma mensagem diretamente para o frontend através do socket
                                                        //primeiro recebe o parametro "identificador" da mensagem, depois o conteúdo da mensagem(no exemplo um obj com msg)
      
        socket.on('hello_client_response',(data)=>{   //msg vinda do frontend através do método 'on'
           console.log(data.msg);
       })    
       const userID = Math.floor(Math.random()*10);
       socket.broadcast.emit('hello',{msg:`New user connected:${userID}`})//o config broadcast manda mensagens para todos os outros sockets, menos para ele que acabou de se conectar.
       // io.emit('hello',{msg:`New user connected:${userID}`}) //o io gerencia todos os sockets, entao com os métodos aplicados ao io, a mensagem irá para todos os sockets conectados
});
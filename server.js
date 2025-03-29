// Estas son las importaciones necesarias para el proyecto
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// se instancia y se crea la app y el servidor socket
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// declaro publica la carpeta public poder servir el html dentro de esta carpeta
app.use(express.static('public')); 

//creo el escuchador de eventos
io.on('connection', (socket) => {
    
    //listener que tienen que llamar los clientes para suscribirse  una sala de chat
    socket.on('joinRoom', (room) => {
        socket.join(room);         
        socket.to(room).emit('message', `Un nuevo usuario se ha unido a la sala ${room}`);
    });

    // listener que recepciona y emite los mensajes a la sala correspondiente
    socket.on('message', ({ room, message }) => {
        io.to(room).emit('message', message);        
    });

    //listener que se llama para cancelar la suscripcion a la sala cuando se recarga la pagina o se cierra la pagina
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
// 
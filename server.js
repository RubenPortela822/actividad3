const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); 

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('joinRoom', (room) => {
        socket.join(room); 
        
        socket.to(room).emit('message', `Un nuevo usuario se ha unido a la sala ${room}`);
    });

    socket.on('message', ({ room, message }) => {
        io.to(room).emit('message', message);        
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Importaciones propias
const Message = require('./models/Message');
const authRoutes = require('./routes/auth');
const db = require('./config/db');

// Config
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Inicializaciones
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*' // Cambiar a tu frontend si lo desplegás por separado
    }
});

// Conectar a MongoDB


// Middlewares de Express
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas HTTP
app.use('/api/auth', authRoutes);

// Middleware para autenticar usuarios al conectar por Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Token no proporcionado'));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);                
        socket.user = decoded; // Guardamos el usuario decodificado en el socket
        console.log(socket);
        
        next();
    } catch (err) {
        next(new Error('Token inválido'));
    }
});

// Manejo de sockets
io.on('connection', async (socket) => {
    console.log(`✅ Usuario conectado por socket: ${socket.user.username}`);
    // Al conectarse, enviar los últimos 50 mensajes
    try {
        const recentMessages = await Message.find({ room: 'general' })
            .sort({ timestamp: -1 }) // Más recientes primero
            .limit(50)
            .lean();

        // Enviarlos al cliente en orden cronológico
        socket.emit('chatHistory', recentMessages.reverse());
    } catch (err) {
        console.error('❌ Error al obtener historial:', err);
    }

    socket.on('message', async (data) => {
        const newMessage = new Message({
            user: {
                _id: socket.user.userId,
                username: socket.user.username
            },
            content: data,
            room: 'general' // o podrías usar socket.room si manejás salas
        });

        try {
            await newMessage.save();
            io.emit('message', {
                user: newMessage.user,
                content: newMessage.content,
                timestamp: newMessage.timestamp
            });
        } catch (err) {
            console.error('❌ Error al guardar el mensaje:', err);
        }

    });

    socket.on('disconnect', () => {
        console.log(`👋 ${socket.user.username} se desconectó`);
    });
});


// Iniciar el servidor HTTP
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

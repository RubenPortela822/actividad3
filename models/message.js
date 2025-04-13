const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    content: {
        type: String,
        required: true
    },
    room: {
        type: String,
        default: 'general' // Podés usar esto para separar mensajes por sala
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si el usuario o el email ya existen
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        return res.status(400).json({ msg: 'El nombre de usuario o el email ya están en uso.' });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
console.log(newUser);

        // Crear un token para el usuario
        const token = jwt.sign({ userId: newUser._id, username:newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar el usuario', error });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
    }

    // Crear un token
    const token = jwt.sign({ userId: user._id, username:user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;

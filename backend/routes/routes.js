const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verificarCredenciales } = require('../middleware/middleware.js');
const { crearEntrada, recuperarEntradas } = require('../solicitudes/solicitudes.js');

router.get('/usuarios', async (req, res) => {
    try {
        const users = await recuperarEntradas ();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post('/usuarios', async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        await crearEntrada(email, password, rol, lenguage);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Correo electrónico y contraseña son obligatorios" });
        }

        await verificarCredenciales(email, password);

        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
});

module.exports = router;


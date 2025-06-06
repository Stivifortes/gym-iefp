const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: 'Usuario não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({ error: 'Palavra passe incorreta' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        res.send({ user, token });
    } catch (err) {
        res.status(500).send({ error: 'Erro ao efetuar login' });
    }
});

module.exports = app => app.use('/login', router);
const { response } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/USER.model');
const JWTgenerator = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { body } = req;

    try {
        let user = await User.findOne({ email: body.email });
        if (user) return res.status(400).json({ ok: false, body: 'Error' });

        user = new User(body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        await user.save();

        const token = await JWTgenerator(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }

};

const login = async (req, res = response) => {

    const { body } = req;

    try {
        const user = await User.findOne({ email: body.email });
        if (!user) return res.status(400).json({ ok: false, body: 'Error' });
        
        const validPassword = bcrypt.compareSync(body.password, user.password);
        if (!validPassword) return res.status(400).json({ ok: false, body: 'Error' });

        const token = await JWTgenerator(user.id, user.name);

        res.status(201).json({
            ok: true,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }
};

const refreshToken = async (req, res = response) => {

    const { uid, name } = req;
    if (!uid || !name) return res.status(400).json({ ok: false, body: 'Error' });
    try {
        const token = await JWTgenerator(uid, name);
        res.status(201).json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }
};

module.exports = {
    createUser,
    login,
    refreshToken,
}
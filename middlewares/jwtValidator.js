const { response } = require('express');
const jwt = require('jsonwebtoken');

const JWTValidator = async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).json({ ok: false, msg: 'error' });
    try {
        const payload = await jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = payload.uid;
        req.name = payload.name;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }

};

module.exports = JWTValidator;
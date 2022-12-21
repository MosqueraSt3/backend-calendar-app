const jwt = require('jsonwebtoken');

const JWTgenerator = (uid, name) => {
    return new Promise((res, rej) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',
        }, (err, token) => {
            console.log(err);
            if (err) return rej('Error token');
            res(token);
        });
    });
}

module.exports = JWTgenerator
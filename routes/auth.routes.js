const express = require('express');
const { check } = require('express-validator');

const { createUser, login, refreshToken } = require('../controllers/auth.controller');
const fieldValidator = require('../middlewares/fieldValidator');
const JWTValidator = require('../middlewares/jwtValidator');

const router = express.Router();

router.post('/post', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').isLength({ min: 6 }),
    fieldValidator,
], createUser);
router.post('/', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldValidator,
], login);
router.get('/get', [ JWTValidator ], refreshToken);

module.exports = router;
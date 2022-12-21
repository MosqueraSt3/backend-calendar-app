const express = require('express');
const { check } = require('express-validator');

const fieldValidator = require('../middlewares/fieldValidator');
const JWTValidator = require('../middlewares/jwtValidator');

const isDate = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');

const router = express.Router();

router.use(JWTValidator);

router.get('/', getEvents);
router.post('/post', [
    check('title', 'The title is mandatory').not().isEmpty(),
    check('start', 'The start is mandatory').custom(isDate),
    check('end', 'The end is mandatory').custom(isDate),
    fieldValidator,
], createEvent);
router.patch('/:eventId', [
    check('title', 'The title is mandatory').not().isEmpty(),
    check('start', 'The start is mandatory').custom(isDate),
    check('end', 'The end is mandatory').custom(isDate),
    fieldValidator,
], updateEvent);
router.delete('/:eventId', deleteEvent);

module.exports = router;
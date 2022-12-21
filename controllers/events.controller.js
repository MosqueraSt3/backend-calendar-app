const { response } = require('express');

const Event = require('../models/EVENT.model');

const getEvents = async (req, res = response) => {
    try {
        const events = await Event.find().populate('user', 'name');

        res.json({
            ok: true,
            events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }
};

const createEvent = async (req, res = response) => {
    const { body } = req;
    const event = new Event(body);
    try {
        event.user = req.uid,
        await event.save();
        res.status(201).json({
            ok: true,
            event,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }
};

const updateEvent = async (req, res = response) => {
    const { eventId } = req.params;
    const { body } = req;
    try {
        const event = await Event.findByIdAndUpdate(eventId, body, { new: true });
        res.json({
            ok: true,
            event,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Error',
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const { eventId } = req.params;
    try {
        await Event.findByIdAndRemove(eventId);
        res.json({
            ok: true,
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
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}
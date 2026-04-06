const { Show } = require('../models');
const {
    createCalendarEvent,
} = require('../services/googleCalendarService/googleCalendarService');

const getAllShows = async (req, res) => {
    try {
        let shows = await Show.find();
        res.json(shows);
    } catch (error) {
        res.send(error);
    }
};

const getShowById = async (req, res) => {
    try {
        let show = await Show.findOne({ _id: req.params.id });
        res.json(show);
    } catch (error) {
        res.send(error);
    }
};

const createShow = async (req, res) => {
    try {
        const { venue, show_poster, location, date, time, cover } = req.body;

        let newShow = await Show.create({
            venue: venue,
            show_poster: show_poster,
            location: location,
            date: date,
            time: time,
            cover: cover,
        });
        if (newShow) {
            createCalendarEvent(newShow);
            res.status(200).json({ message: 'Show successfully added!' });
        } else {
            res.status(404).json({
                message: 'There was an error creating the show: ',
                error,
            });
        }
    } catch (error) {
        console.error('There was an error creating the show');
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteShow = async (req, res) => {
    try {
        let showToDelete = await Show.findOneAndDelete({
            _id: req.params.id,
        });
        if (showToDelete) {
            res.status(200).json({ message: 'Show successfully deleted.' });
        } else {
            res.status(404).json({
                message: 'There was an error creating the show: ',
                error,
            });
        }
    } catch (error) {
        console.error('There was an error creating the show');
        res.status(500).json({ message: 'Internatl server error' });
    }
};

module.exports = {
    getAllShows,
    getShowById,
    createShow,
    deleteShow,
};

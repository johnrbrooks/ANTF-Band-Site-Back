const { Show } = require('../models');
const { Venue } = require('../models');
const {
    createCalendarEvent,
} = require('../services/googleCalendarService/googleCalendarService');
const { findVenueValue } = require('../utilities/mappings');

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

const addShow = async (req, res) => {
    try {
        const { venue, date } = req.body;

        const venueData = await Venue.findById(venue);

        if (!venueData) {
            return res
                .status(404)
                .json({ message: 'The venue was not found.' });
        }

        let newShow = await Show.create({
            venue: venueData.name,
            show_poster: venueData.show_poster,
            location: venueData.location,
            date: date,
            time: venueData.show_time,
            cover: venueData.cover,
            pay: venueData.pay,
        });

        if (!newShow) {
            return res
                .status(404)
                .json({ message: 'There was an error creating the show.' });
        }

        try {
            const showCalendarEvent = await createCalendarEvent(newShow);

            if (showCalendarEvent?.id) {
                newShow.googleCalendarEventId = showCalendarEvent.id;
                await newShow.save();
            }
        } catch (error) {
            console.error(
                'There was an error adding the show to the calendar.',
            );
        }

        return res.status(201).json({
            message: 'Show successfully added!',
        });
    } catch (error) {
        console.error('There was an error creating the show', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//DEPRECATED
// const createShow = async (req, res) => {
//     try {
//         const { venue, show_poster, location, date, time, cover } = req.body;

//         const pay = findVenueValue(venue);

//         let newShow = await Show.create({
//             venue: venue,
//             show_poster: show_poster,
//             location: location,
//             date: date,
//             time: time,
//             cover: cover,
//             pay: pay,
//         });

//         if (!newShow) {
//             return res
//                 .status(404)
//                 .json({ message: 'There was an error creating the show.' });
//         }

//         try {
//             const showCalendarEvent = await createCalendarEvent(newShow);

//             if (showCalendarEvent?.id) {
//                 newShow.googleCalendarEventId = showCalendarEvent.id;
//                 await newShow.save();
//             }
//         } catch (error) {
//             console.error(
//                 'There was an error adding the show to the calendar.',
//             );
//         }

//         return res.status(201).json({
//             message: 'Show successfully added!',
//         });
//     } catch (error) {
//         console.error('There was an error creating the show', error.message);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

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
    addShow,
    deleteShow,
};

const { Venue } = require('../models');

const getAllVenues = async (req, res) => {
    try {
        let venues = await Venue.find();

        res.status(200).json({ venues });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getVenueById = async (req, res) => {
    try {
        const venueId = req.params.id;

        if (!venueId) {
            return res
                .status(400)
                .json({ message: 'Venue ID must be provided.' });
        }

        const venue = await Venue.findById(venueId);

        if (!venue) {
            return res.status(404).json({ message: 'Venue not found.' });
        }

        res.status(200).json({ venue });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addVenue = async (req, res) => {
    try {
        const {
            name,
            location,
            show_poster,
            show_time,
            ae_needed,
            cover,
            pay,
        } = req.body;

        if (!name || !location || !show_poster || !show_time || !cover) {
            return res
                .status(400)
                .json({ message: 'All values are required for creation' });
        }

        let newVenue = await Venue.create({
            name: name,
            location: location,
            show_poster: show_poster,
            show_time: show_time,
            ae_needed: ae_needed,
            cover: cover,
            pay: pay,
        });

        if (!newVenue) {
            return res
                .status(400)
                .json({ message: 'There was an error creating the venue.' });
        }

        res.status(201).json({ message: 'Venue added successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const modifyVenue = async (req, res) => {
    try {
        const venueId = req.params.id;

        if (!venueId) {
            return res.status(400).json({ message: 'Venue ID is required.' });
        }

        const updates = {};

        for (const field of allowedVenueUpdateFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: 'No valid fields were provided for update.',
            });
        }

        const updatedVenue = await Venue.findByIdAndUpdate(
            venueId,
            { $set: updates },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedVenue) {
            return res.status(404).json({ message: 'Venue not found.' });
        }

        return res.status(200).json({
            message: 'Venue updated successfully.',
            venue: updatedVenue,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteVenue = async (req, res) => {
    try {
        const venueId = req.params.id;

        if (!venueId) {
            return res.status(400).json({ message: 'Venue ID is required.' });
        }

        const venue = await Venue.findByIdAndDelete(venueId);

        if (!venue) {
            return res
                .status(404)
                .json({ message: 'There was an error deleting the venue.' });
        }

        res.status(202).json({ message: 'Venue successfully deleted.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllVenues,
    getVenueById,
    addVenue,
    modifyVenue,
    deleteVenue,
};

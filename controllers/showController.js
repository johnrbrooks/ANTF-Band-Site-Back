const { Show } = require('../models')

const getAllShows = async (req, res) => {
    try {
        let shows = await Show.find();
        res.json(shows)
    } catch (error) {
        res.send(error)
    }
}

const getShowById = async (req, res) => {
    try {
        let show = await Show.findOne({ _id: req.params.id });
        res.json(show)
    } catch (error) {
        res.send(error)
    }
}

const createShow = async (req, res) => {
    try {
        let newShow = await Show.create({
            venue: req.body.venue,
            show_poster: req.body.show_poster,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
            cover: req.body.cover
        })
        if(newShow) {
            res.status(200).json({ message: 'Show successfully added!' })
        } else {
            res.status(404).json({ message: 'There was an error creating the show: ', error })
        }
    } catch(error) {
        console.error('There was an error creating the show')
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getAllShows,
    getShowById,
    createShow,
}
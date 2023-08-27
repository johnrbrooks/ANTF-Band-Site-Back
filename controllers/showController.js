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

/* const createSong = async (req, res) => {
    try {
        let newSong = await Song.create({
            name: req.body.name,
            artist: req.body.artist,
        })
        res.send(newSong)
    } catch (error) {
        res.send(error)
    }
} */

module.exports = {
    getAllShows,
    getShowById,
}
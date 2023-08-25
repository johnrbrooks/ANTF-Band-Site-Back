const { Song } = require('../models')

const getAllSongs = async (req, res) => {
    try {
        let songs = await Song.find();
        res.json(songs)
    } catch (error) {
        res.send(error)
    }
}

const createSong = async (req, res) => {
    try {
        let newSong = await Song.create({
            name: req.body.name,
            artist: req.body.artist,
        })
        res.send(newSong)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAllSongs,
    createSong
}
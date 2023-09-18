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

const deleteSong = async (req, res) => {
    try {
        let songToDelete = await Song.findOneAndDelete({
            name: req.body.name
        })
        if(songToDelete) {
            res.status(200).json({ message: 'Successfuly deleted song. '})
        } else {
            res.status(404).json({ message: 'Song not found.' })
        }
    } catch (error) {
        console.error('There was an error deleting the song: ', error)
        res.status(500).json({ message: 'Internal server error.' })
    }
}

module.exports = {
    getAllSongs,
    createSong,
    deleteSong
}
const express = require('express')
const Router = express.Router()
const controller = require('../controllers/songController')

Router.get('/get/all', controller.getAllSongs)

Router.post('/create', controller.createSong)

module.exports = Router
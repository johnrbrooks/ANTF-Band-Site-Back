const express = require('express')
const Router = express.Router()
const controller = require('../controllers/showController')

Router.get('/get/all', controller.getAllShows)
Router.get('/get/:id', controller.getShowById)

Router.post('/create', controller.createShow)

Router.delete('/delete', controller.deleteShow)

module.exports = Router
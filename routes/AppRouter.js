const express = require("express");
const Router = express.Router();

const ContactFormRouter = require('./ContactFormRouter')
const SongRouter = require('./SongRouter')

Router.use('/forms', ContactFormRouter)
Router.use('/songs', SongRouter)

module.exports = Router;
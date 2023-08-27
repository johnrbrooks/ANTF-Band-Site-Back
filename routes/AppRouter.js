const express = require("express");
const Router = express.Router();

const ContactFormRouter = require('./ContactFormRouter')
const SongRouter = require('./SongRouter')
const ShowRouter = require('./ShowRouter')

Router.use('/forms', ContactFormRouter)
Router.use('/songs', SongRouter)
Router.use('/shows', ShowRouter)

module.exports = Router;
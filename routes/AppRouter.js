const express = require("express");
const Router = express.Router();

const ContactFormRouter = require('./ContactFormRouter')
const SongRouter = require('./SongRouter')
const ShowRouter = require('./ShowRouter')
const AdminRouter = require('./AdminRouter')

Router.use('/forms', ContactFormRouter)
Router.use('/songs', SongRouter)
Router.use('/shows', ShowRouter)
Router.use('/admin', AdminRouter)

module.exports = Router;
const express = require('express');
const Router = express.Router();
const controller = require('../controllers/showController');
const { requireAuth } = require('../middleware/requireAuth.js');

Router.get('/get/all', controller.getAllShows);
Router.get('/get/:id', controller.getShowById);

Router.post('/create', requireAuth, controller.createShow);

Router.delete('/delete/:id', requireAuth, controller.deleteShow);

module.exports = Router;

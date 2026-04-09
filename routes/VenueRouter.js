const express = require('express');
const Router = express.Router();
const controller = require('../controllers/venueController');
const { requireAuth } = require('../middleware/requireAuth.js');

Router.get('/get/all', requireAuth, controller.getAllVenues);
Router.get('/get/:id', requireAuth, controller.getVenueById);

Router.post('/add', requireAuth, controller.addVenue);

Router.patch('/update/:id', requireAuth, controller.modifyVenue);

Router.delete('/delete/:id', requireAuth, controller.deleteVenue);

module.exports = Router;

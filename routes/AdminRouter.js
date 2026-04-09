const express = require("express");
const Router = express.Router();
const controller = require("../controllers/adminController");

Router.get("/get/:email", controller.getAdmin);
Router.get("/checkAuth", controller.getCurrentAdmin);

Router.post("/login", controller.loginAdmin);
Router.post("/logout", controller.logoutAdmin);

// temporary route to create the admin
Router.post("/createAdmin", controller.createAdmin);

module.exports = Router;

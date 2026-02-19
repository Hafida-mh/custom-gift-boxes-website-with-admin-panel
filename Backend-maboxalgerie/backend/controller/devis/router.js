const express = require("express");
const routerdevis = express.Router();
const controllerdevis = require('../devis/controller');

routerdevis.post('/senddevis',  controllerdevis.senddevis);
routerdevis.post('/deletedevis',  controllerdevis.deletedevis);
routerdevis.get('/getedevis',  controllerdevis.getalldevis);

module.exports = routerdevis;

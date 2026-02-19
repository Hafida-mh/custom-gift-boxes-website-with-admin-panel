const express = require("express");
const routerAuth = express.Router();
const controllAuth= require('../authentification/controller');
const authMiddleware = require('../middleware/Authentification')

routerAuth.put('/update', authMiddleware, controllAuth.updatepw);
routerAuth.post('/check', controllAuth.checkConnexion);
routerAuth.get('/getpw', controllAuth.getPassword);
routerAuth.post('/login', controllAuth.connextion);
routerAuth.get('/checkroute', authMiddleware, controllAuth.checkRoute);
routerAuth.post('/getpassword', controllAuth.forgotPassword);

module.exports = routerAuth;

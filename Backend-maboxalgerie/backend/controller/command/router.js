const express = require("express");
const routerCommannd = express.Router();
const controllCommand = require('../command/controller');
const authMiddleware = require('../middleware/Authentification');

routerCommannd.post('/add', controllCommand.postCommand);
routerCommannd.get('/getcommand', controllCommand.getAllCommands);
routerCommannd.get('/get-commend',  authMiddleware, controllCommand.getCommands);
routerCommannd.post('/update', controllCommand.confirmCommand);
routerCommannd.post('/delete', controllCommand.deletCommand);
routerCommannd.post('/cancel', controllCommand.cancelCommand);
routerCommannd.post('/updateqte', controllCommand.updateqtes);
routerCommannd.post('/updatecomment', controllCommand.updateComment)
routerCommannd.post('/postboxcommand', controllCommand.postcommanndbox)
routerCommannd.get('/getboxcommand', controllCommand.getAllboxcommand)
routerCommannd.post('/deleteboxcommand', controllCommand.deletCommandbox)

module.exports = routerCommannd;

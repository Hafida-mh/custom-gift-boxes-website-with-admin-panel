const express = require("express");
const routernewsletter = express.Router();
const controllNewsletter = require('../newsletter/controller');

routernewsletter.post('/addnewsletter',  controllNewsletter.addnewsletter);
routernewsletter.get('/getnewsletter',  controllNewsletter.displayNewsletter);
routernewsletter.post('/deletenewsletter',  controllNewsletter.deleteNewsletter);

   module.exports = routernewsletter;
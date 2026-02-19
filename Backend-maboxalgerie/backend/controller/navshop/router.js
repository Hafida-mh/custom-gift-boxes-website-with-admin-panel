const express = require("express");
const routerNavShop = express.Router();
const controllnavshop = require('../navshop/controller');

routerNavShop.post('/addcategory', controllnavshop.addShopContent);
routerNavShop.get('/getcategory',controllnavshop.getshoplist);

module.exports = routerNavShop;
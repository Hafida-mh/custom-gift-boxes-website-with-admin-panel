const express = require("express");
const router_cart = express.Router();
const cart_controller = require('./controller');
const authentification = require("../middleware/Authentification")

router_cart.post('/add', cart_controller.addCart);
router_cart.get('/get', authentification,  cart_controller.getCart);
router_cart.post('/delete', cart_controller.deletCart);

module.exports = router_cart;

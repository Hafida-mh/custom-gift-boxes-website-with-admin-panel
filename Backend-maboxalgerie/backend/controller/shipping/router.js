const express = require("express");
const router_shipping= express.Router();
const controller_shipping= require('../shipping/controller');

router_shipping.get('/get', controller_shipping.getallwilayas);
router_shipping.post('/updateprice', controller_shipping.updatePriceDelivery);

module.exports = router_shipping;

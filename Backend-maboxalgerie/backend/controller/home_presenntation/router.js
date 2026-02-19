const express = require("express");
const router_text_presentation= express.Router()
const presentation = require("./controller");

router_text_presentation.post('/add', presentation.addtext);
router_text_presentation.post('/update', presentation.updatePresentation);
router_text_presentation.get('/getInfo', presentation.getText);
module.exports = router_text_presentation;
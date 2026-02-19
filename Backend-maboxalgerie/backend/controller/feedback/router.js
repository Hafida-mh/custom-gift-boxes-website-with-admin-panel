const express = require("express");
const router_Img_feedback= express.Router();
const controller_feedback = require('./controller');

router_Img_feedback.post('/post', controller_feedback.postFeedback);
router_Img_feedback.get('/get', controller_feedback.getAllfeedback);
router_Img_feedback.post('/delete', controller_feedback.deleteFeedback);

module.exports = router_Img_feedback;
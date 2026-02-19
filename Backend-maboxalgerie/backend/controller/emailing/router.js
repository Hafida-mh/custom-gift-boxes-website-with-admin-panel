const express = require("express")
const router_email = express.Router()
const controller_email = require('./controller')
const authorization = require('../middleware/Authentification')
router_email .post('/send', authorization, controller_email.sendEmail);
router_email.post('/sendconfirmationcommand', controller_email.sendEmailConfirmation)
module.exports = router_email;
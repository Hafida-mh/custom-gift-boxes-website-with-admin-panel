const express = require("express");
const router_advantage = express.Router();
const controller_advantage = require('./Controller')
const multer  = require('multer');

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename : (req, file, cb) => {
      cb(null, file.originalname)
    }
   })
   var upload = multer({ storage: storage });

router_advantage.post('/save', controller_advantage.addAdvantage);
router_advantage.get('/get', controller_advantage.getAllicon);
router_advantage.post('/saveIcon', upload.single('icon'), controller_advantage.uploadimg);
router_advantage.post('/deletead', controller_advantage.deleteFeedback);

module.exports = router_advantage;

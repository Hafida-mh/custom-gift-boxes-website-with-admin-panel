const express = require("express");
const routerbox = express.Router();
const controllbox = require('../box/controller');
const multer  = require('multer');
const authenticate = require('../middleware/Authentification')
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
      cb(null, 'boximages')
    },
    filename : (req, file, cb) => {
      cb(null, file.originalname)
    }
   })
   var upload = multer({ storage: storage });

   routerbox.post('/addbox', controllbox.addBox);
   routerbox.post('/uploadimgBox', upload.single('image'), controllbox.uploadimgbox);
   routerbox.get('/getallboxes', controllbox.displayBox);
   routerbox.post('/deletebox', controllbox.deleteBox);
   routerbox.post('/updateboxinfo', controllbox.updateboxinfo);



module.exports = routerbox;
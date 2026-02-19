const express = require("express");
const routerworkshop = express.Router();
const controllWorkshop = require('../workshop/controller');
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
   routerworkshop.post('/addworkshop',  controllWorkshop.addworkshop);
   routerworkshop.post('/uploadimgworkshop', upload.single('image'), controllWorkshop.uploadimg);
   routerworkshop.get('/getworkshop',  controllWorkshop.displayWorkshop);
   routerworkshop.post('/updateworkshop',  controllWorkshop.updateWorkshop);
   routerworkshop.post('/deleteworkshop',  controllWorkshop.deleteWorkshop);
   routerworkshop.post('/register', controllWorkshop.registerworkshop);
   routerworkshop.post('/deleteregistration', controllWorkshop.deleteCandidate);
   routerworkshop.get('/getregistration', controllWorkshop.getallregistration);

   module.exports = routerworkshop;
   
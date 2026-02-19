const express = require("express");
const router_Img_Slide= express.Router();
const connstrollerSlide = require('./controller');
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

router_Img_Slide.post('/uploadSlidePhoto' ,connstrollerSlide.uploadImg);
router_Img_Slide.get('/getSlide', connstrollerSlide.getSlides);
router_Img_Slide.post('/deleteSlide', connstrollerSlide.deleteSlide);
router_Img_Slide.post('/uploadimg', upload.single('image'), connstrollerSlide.uploadimg);

module.exports = router_Img_Slide;
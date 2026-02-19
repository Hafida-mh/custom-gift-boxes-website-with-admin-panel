const express = require("express");
const router_category = express.Router();
const controll_category = require('../category/conntroller');
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

router_category.post('/add', controll_category.addCategory);
router_category.get('/get', controll_category.getCategory);
router_category.post('/delete', controll_category.deleteCategory);
router_category.post('/uploadimgcategory', upload.single('image'), controll_category.uploadimg);

module.exports = router_category;
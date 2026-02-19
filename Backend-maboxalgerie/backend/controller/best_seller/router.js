const express = require("express");
const multer = require('multer');
const router_best_seller_product = express.Router();
const best_seller_controller = require('./controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'productsimg')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

router_best_seller_product.get('/getAllProuct', best_seller_controller.getAllProduct);
router_best_seller_product.post('/addbestseller', best_seller_controller.addBestSellerProduct);
router_best_seller_product.post('/deleteProduct', best_seller_controller.deleteBestSeller);
router_best_seller_product.post('/uploadimgproduct', upload.single('image'), best_seller_controller.uploadImgProduct);
router_best_seller_product.post('/details', best_seller_controller.getProductInfo);

module.exports = router_best_seller_product;
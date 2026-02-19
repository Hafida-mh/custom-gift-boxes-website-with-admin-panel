const express = require("express");
const routerProduct = express.Router();
const controllPorduct = require('../product/controller');
const multer  = require('multer');
const authenticate = require('../middleware/Authentification')
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
      cb(null, 'productsimg')
    },
    filename : (req, file, cb) => {
      cb(null, file.originalname)
    }
   })
   var upload = multer({ storage: storage });

routerProduct.post('/addproduct',  authenticate, controllPorduct.addProduct);
routerProduct.get('/get',controllPorduct.displayProduct);
routerProduct.post('/uploadimgProduct', upload.single('image'), controllPorduct.uploadimg);
routerProduct.post('/test',controllPorduct.test);
routerProduct.post('/addtobestseller',controllPorduct.updatebestsellerstatut);
routerProduct.post('/addMultiple', controllPorduct.addMultipleBestSellerProduct);
routerProduct.post('/update', controllPorduct.updateProduct);
routerProduct.post('/delete',controllPorduct.deleteProduct);
routerProduct.post('/updateQte',controllPorduct.updateQteProduct );
routerProduct.post('/getinfo',controllPorduct.getProductInfo);

module.exports = routerProduct;
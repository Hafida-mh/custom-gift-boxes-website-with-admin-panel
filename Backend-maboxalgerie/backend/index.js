const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
require("dotenv").config();
const mysql = require('mysql');
const uniqid = require('uniqid');
const multer = require('multer');
const jwt = require("jsonwebtoken");

// https://www.sammeechward.com/uploading-images-express-and-react
// Routers
const routerProduct = require('./controller/product/router');
const routerCommannd = require('./controller/command/router');
const routerAuth = require('./controller/authentification/router');
const routerNavShop = require('./controller/navshop/router');
const router_slide_img = require('./controller/slide/router');
const router_best_seller_product = require('./controller/best_seller/router');
const router_text_presentation = require('./controller/home_presenntation/router');
const router_advantage = require('./controller/advantage/router');
const router_feedback = require('./controller/feedback/router');
const router_category = require('./controller/category/router');
const router_cart = require("./controller/cart/router");
const router_email = require('./controller/emailing/router');
const router_shipping = require('./controller/shipping/router');
const routerbox = require("./controller/box/router");
const routerworkshop = require("./controller/workshop/router");
const routerdevis = require('./controller/devis/router');
const routernewsletter = require('./controller/newsletter/router')
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods : ["GET", "POST", "PUT"]
//  preflightContinue : false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/'));

app.use((req, res, next) => {
//res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
res.setHeader("Access-Control-Allow-Credentials", "true");

 res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/product', routerProduct);
app.use('/command', routerCommannd);
app.use('/auth',  routerAuth);
app.use('/shopnav', routerNavShop);
app.use('/upload', router_slide_img);
app.use('/bestseller', router_best_seller_product);
app.use('/addText', router_text_presentation);
app.use('/advantage', router_advantage);
app.use('/feedback', router_feedback);
app.use('/category', router_category);
app.use('/cart', router_cart);
app.use('/emailing', router_email);
app.use('/shipping', router_shipping);
app.use('/box', routerbox);
app.use('/workshop', routerworkshop);
app.use('/devis', routerdevis);
app.use('/newsletter', routernewsletter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' })
app.post('/', upload.single('file'), (req, res) => {
  console.log(req.body)
})
/*
const displayProduct = (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
  });
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Database ecommerceé Connected!");
  });
  const command = "SELECT * FROM `product`"
  connection.query(command, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      var string=JSON.stringify(results);
      var json =  JSON.parse(string);
      console.log(json)
      return res.status(200).json({
        data : json,
        message : "display successfully"
      })
    }
  })
}
displayProduct()
*/




//tt();
const PORT = process.env.PORT || 2000
app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));

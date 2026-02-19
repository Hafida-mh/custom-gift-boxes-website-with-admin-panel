const mysql = require('mysql');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
// DATA BASE CONNEXION
const connection = require('../db');

const test = (req, res) => {
  const json = req.body;
  let command = `INSERT INTO product (id, name, category, capacity, weight, price, length, color, quantity, description, availability, img) VALUES ?`;

  connection.query(command, [json], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        message: results
      });
    }
  });
}

const addProduct = async (req, res) => {
  const id = req.body.id
  const name = req.body.name;
  const category = req.body.category;
  const capacity = req.body.capacity;
  const weight = req.body.weight;
  const price = req.body.price;
  const length = req.body.length;
  const color = req.body.color;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const availability = req.body.availability;
  const img = req.body.img;

  try {
    let command = `INSERT INTO product (id, name, category, capacity, availability, weight, price, length, color, quantity, description, img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    let values = [id, name, category, capacity, weight, price, length, color, quantity, description, availability, img];
    connection.query(command, [id, name, category, capacity, availability, weight, price, length, color, quantity, description, img], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        return res.status(200).json({
          data: results,
          message : "Produit ajouté avec succés !"
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const displayProduct = (req, res) => {
  const command = "SELECT * FROM `product`"
  connection.query(command, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      let results_to_string = JSON.stringify(results);
      let result_to_json = JSON.parse(results_to_string);
      return res.status(200).json({
        data: result_to_json,
        message: "display successfully"
      });
    }
  })
}

const uploadimg = (req, res) => {
  console.log("hii")
}

const addMultipleBestSellerProduct = async (req, res) => {
  const allproducts = req.body;
  let command = `INSERT INTO product (id, name, category, capacity, availability, weight, price, length, color, quantity, description, urlimg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  // let command = `INSERT INTO topsells (id, productname, filename, productprice) VALUES (?,?,?,?)`
  for (let i = 0; i <= ((allproducts.length) - 1); i++) {

    connection.query(command, [(uuidv4()), allproducts[i].name, allproducts[i].category, allproducts[i].capacity, allproducts[i].availability, allproducts[i].weight, allproducts[i].price, allproducts[i].length, allproducts[i].color, allproducts[i].quantity, allproducts[i].description, allproducts[i].urlimg], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    });
  }
  return res.status(200).json({
    message: "uploaded successfully"
  })
}


const updateProduct = (req, res) => {
  const data = req.body;
  let command = `UPDATE product SET name =?, quantity =? ,category=?, capacity=?, weight=?, price=?, length=?, color=?, img=?, description=?, availability=? WHERE id=?`;
  connection.query(command, [data.name, data.quantity, data.category, data.capacity, data.weight, data.price, data.length, data.color, data.img, data.description, data.availability, data.id], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        message: "Contenu mis à jour avec succés !"
      });
    }
  })
}

const deleteProduct = (req, res) => {
  const product_id = req.body.id;

  let command = "DELETE FROM `product` WHERE `id` = ?"
  connection.query(command, [product_id], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        data: results,
        message: "Produit supprimé"
      });
    }
  })
}

const updateQteProduct = (req, res) => {
  const new_qte_product = req.body.qte;
  const id = req.body.id;
console.log(new_qte_product)
  let command = `UPDATE product SET quantity =? WHERE id=?`;
  connection.query(command, [new_qte_product, id], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        data: results,
        message: "Quantité mise à jour avec succés !"
      });
    }
  })
}

const updatebestsellerstatut = (req,res)=> {
  const id = req.body.id;
  const bestseller = req.body.statut;

  let command = `UPDATE product SET bestseller =? WHERE id=?`;
  connection.query(command, [bestseller, id], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        data: results,
        message: "Ajouté aux meuilleures ventes avec succés !"
      });
    }
  })
}
const getProductInfo = (req,res) => {
const product_id = req.body.id;
const command = 'SELECT * FROM `product` WHERE id=?'
  connection.query(command, [product_id], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        data: results,
        message: "Infos loaded successfully"
      });
    }
  })
}

module.exports = {
  addProduct,
  displayProduct,
  updatebestsellerstatut,
  uploadimg,
  test,
  addMultipleBestSellerProduct,
  updateProduct,
  deleteProduct,
  updateQteProduct,
  getProductInfo
}

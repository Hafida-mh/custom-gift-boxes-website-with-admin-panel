const mysql = require('mysql');
require("dotenv").config();
const uniqid= require('uniqid');
const multer  = require('multer');
// DATA BASE CONNEXION
const connection = require('../db');

  const addBestSellerProduct = (req, res) => {
    const id = req.body.id;
    const price = req.body.price;
    const name_img= req.body.filename;
    const product_name = req.body.productname;
    const category = req.body.category;
    const capacity = req.body.capacity;
    const length = req.body.length;
    const description = req.body.description;
    const color = req.body.color;
    const t = req.body;
    console.log(t)
    console.log(name_img);
   let command = `INSERT INTO topsells (id, name, category, filename, price, color, description, length, capacity) VALUES (?,?,?,?,?,?,?,?,?)`
   // let command = `INSERT INTO topsells (id, productname, filename, productprice) VALUES (?,?,?,?)`
    connection.query(command, [id, product_name, category, name_img, price, color, description, length, capacity], (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
         return res.status(200).json({
          message : "Produit ajouté avec succés !"
         });
        }
    })
  }

  const uploadImgProduct = (req, res)=> {
    console.log("hii")
  }

  const getAllProduct = (req, res) => {
    const command = "SELECT * FROM `topsells`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json =  JSON.parse(results_to_string);
       return res.status(200).json({
          data : result_to_json,
          message : "imported successfully"
       });
      }
  })
  }

  const deleteBestSeller = (req, res) => {
    const id = req.body.id;
    console.log(id)
    let command = "DELETE FROM `topsells` WHERE `id` = ?"
    connection.query(command, [id], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        return res.status(200).json({
          data : results,
          message : "Deleted successfully"
        });
      }
    }) 
  }

  const getProductInfo = (req,res) => {
    const product_id = req.body.id;
    const command = 'SELECT * FROM `topsells` WHERE id=?'
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
    addBestSellerProduct,
    uploadImgProduct,
    getAllProduct,
    deleteBestSeller,
    getProductInfo
  }
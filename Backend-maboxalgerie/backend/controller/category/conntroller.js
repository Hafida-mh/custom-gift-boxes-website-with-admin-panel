const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');

  const addCategory = (req, res) => {
    const category = req.body.category;
    const id = req.body.id;
    const icon = req.body.icon;
    console.log(icon)
   try {
     let command = `INSERT INTO category (category, id, photo) VALUES (?, ?, ?)`;
     let values = [category, id, icon];
     connection.query( command, values, (err, results, fields) => {
         if (err) {
           return console.error(err.message);
         }
         else {
          return res.status(200).json({
           message : results
          });
         }
       });
   } catch (error) {
     console.log(error);
   }
 }
 
 const uploadimg = (req, res) => {
  console.log("hii")
}

 const getCategory = (req, res) => {
    const command = "SELECT * FROM `category`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json =  JSON.parse(results_to_string);
        return res.status(200).json({
          data : result_to_json,
          message : "display successfully"
        });
      }
    })
 }

 const deleteCategory = (req, res) => {
    const id = req.body.id;
    let command = "DELETE FROM `category` WHERE `id` = ?"
    connection.query(command, [id], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        return res.status(200).json({
          data : results,
          message : "Supprimer avec succées"
        });
      }
    }) 
  }

 module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    uploadimg
 }
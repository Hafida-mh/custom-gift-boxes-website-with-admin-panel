const mysql = require('mysql');
require("dotenv").config();
const uniqid= require('uniqid');
// DATA BASE CONNEXION
const connection = require('../db');

  const addShopContent = (req, res) => {
    const category = req.body.category
    const undercatecory = req.body.undercatecory;
   
   try {
     let command = `INSERT INTO navshop (categorie,sousCategorie) VALUES (?,?)`;
     let values = [category, undercatecory];
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
 
 const getshoplist = (req, res) => {
    const command = "SELECT * FROM `navshop`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        console.log("hi")
        let results_to_string = JSON.stringify(results);
        let result_to_json =  JSON.parse(results_to_string);
        return res.status(200).json({
          data : result_to_json,
          message : "display successfully"
        });
      }
    })
 }

 module.exports = {
    addShopContent,
    getshoplist
}
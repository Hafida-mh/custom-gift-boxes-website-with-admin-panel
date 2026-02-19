const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');

const addnewsletter = (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
   try {
     let command = `INSERT INTO newsletter (id, email) VALUES (?, ?)`;
     let values = [id, email];
     connection.query( command, values, (err, results, fields) => {
         if (err) {
           return console.error(err.message);
         }
         else {
          return res.status(200).json({
           message : "Workshop ajouté avec succcés"
          });
         }
       });
   } catch (error) {
     console.log(error);
   }
 }

  const displayNewsletter = (req, res) => {
    const command = "SELECT * FROM `newsletter`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json = JSON.parse(results_to_string);
        return res.status(200).json({
          data: result_to_json,
          message: "Workshops affichés avec succés"
        });
      }
    })
  }
  

  const deleteNewsletter = (req, res) => {
    const workshop_id = req.body.id;
  
    let command = "DELETE FROM `newsletter` WHERE `id` = ?"
    connection.query(command, [workshop_id], (err, results, fields) => {
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

 module.exports = {
    addnewsletter,
    displayNewsletter,
    deleteNewsletter
 }

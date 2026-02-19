const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');

const senddevis = (req, res) => {
    const id = req.body.id
    const corporate = req.body.corporate
    const namesender = req.body.namesender
    const phonesender = req.body.phonesender 
    const emailsender = req.body.emailsender 
    const description = req.body.description
    try {
        let command = `INSERT INTO devis (id, corporate, namesender, emailsender, phonesender, detaildevis) VALUES (?, ?, ?, ?, ?, ?)`;
        let values = [id, corporate, namesender, emailsender,  phonesender, description];
        connection.query( command, values, (err, results, fields) => {
         if (err) {
           return console.error(err.message);
         }
         else {
          return res.status(200).json({
           message : "Inscription effectuées avec succcés"
          });
         }
       });
   } catch (error) {
     console.log(error);
   }

}

const deletedevis = (req, res) => {
    const devis_id = req.body.id;
  
    let command = "DELETE FROM `devis` WHERE `id` = ?"
    connection.query(command, [devis_id], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        return res.status(200).json({
          data: results,
          message: "Demande de devis supprimée avec succés"
        });
      }
    })
  }

  const getalldevis = (req, res) => {
    const command = "SELECT * FROM `devis`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json = JSON.parse(results_to_string);
        return res.status(200).json({
          data: result_to_json,
          message: "Inscription Workshops affichés avec succés"
        });
      }
    })

  }
module.exports = {
    senddevis,
    deletedevis,
    getalldevis 
}
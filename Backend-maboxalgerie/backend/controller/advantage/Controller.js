const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');


  const addAdvantage = (req, res) => {
    const icon = req.body.icon;
    const title = req.body.title;
    const descriptif = req.body.descriptif;
    const id = req.body.id;

    let command = `INSERT INTO advantages (id, icon, title, descriptif) VALUES (?,?,?,?)`;
    connection.query(command, [id, icon, title, descriptif], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
     return res.status(200).json({
      message : "Ajouté avec succés"
     });
    }
   })
  }

const getAllicon = (req, res) => {
    const command = "SELECT * FROM `advantages`"
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

const uploadimg = (req, res) => {
    console.log("hii")
}

const deleteFeedback = (req, res) => {
  const feedback_id = req.body.id;
  let command = "DELETE FROM `advantages` WHERE `id` = ?"
  connection.query(command, [feedback_id], (err, results, fields) => {
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

module.exports = {
    addAdvantage,
    getAllicon,
    uploadimg,
    deleteFeedback
}

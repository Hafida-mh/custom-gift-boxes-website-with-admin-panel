const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');

const postFeedback = (req, res) => {
    const name = req.body.name;
    const opinion = req.body.opinion;
    const id = req.body.id;

    let command = "INSERT INTO feedback (id, name, feedback) VALUES (?,?,?)"
    connection.query(command, [id, name, opinion], (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
         return res.status(200).json({
          message : results
         });
        }
    })
}

const getAllfeedback = (req, res) => {
    const command = "SELECT * FROM `feedback`"
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

const deleteFeedback = (req, res) => {
  const feedback_id = req.body.id;
  let command = "DELETE FROM `feedback` WHERE `id` = ?"
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
    postFeedback,
     getAllfeedback,
     deleteFeedback
}
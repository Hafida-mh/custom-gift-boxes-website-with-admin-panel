const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');


const getallwilayas = (req, res) => {
  const command = "SELECT * FROM `delivery`"
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

const updatePriceDelivery = (req,res) => {
  const price = req.body.price;
  const name = req.body.name;
  let command = `UPDATE delivery SET price =? WHERE name=?`;
  connection.query(command, [price, name], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        message: "Prix mis à jour avec succés !"
      });
    }
  })
}

module.exports = {
  getallwilayas,
  updatePriceDelivery
}
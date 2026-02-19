const mysql = require('mysql');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
// DATA BASE CONNEXION
const connection = require('../db');

const addBox = async (req, res) => {
  const id = req.body.id
  const name = req.body.name;
  const color = req.body.color;
  const price = req.body.price;
  const photo = req.body.photo;
  const maxnumber = req.body.maxnumber;
  try {
    let command = `INSERT INTO box (id, boxname, boxphoto, boxcolor, boxproductnumber, 	boxprice) VALUES (?,?,?,?,?,?)`;
    let values = [id, name, photo, color,  maxnumber ,price];
    connection.query(command, values, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        return res.status(200).json({
          data: results,
          message : "Box ajoutée avec succés !"
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const displayBox = (req, res) => {
  const command = "SELECT * FROM `box`"
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

const deleteBox = (req, res) => {
  const box_id = req.body.id;

  let command = "DELETE FROM `box` WHERE `id` = ?"
  connection.query(command, [box_id], (err, results, fields) => {
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

const updateboxinfo = (req, res) => {
  const data = req.body;
  console.log(data.namebox)
  let command = `UPDATE box SET boxname =?, boxphoto =?, boxcolor=?, boxproductnumber=?, boxprice=? WHERE id=?`;
  connection.query(command, [data.namebox, data.photo, data.color, data.maxnumber, data.price, data.id], (err, results, fields) => {
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



const uploadimgbox = (req, res) => {
    console.log("hii")
  }

module.exports = {
    addBox,
    uploadimgbox,
    displayBox,
    deleteBox,
    updateboxinfo 
}

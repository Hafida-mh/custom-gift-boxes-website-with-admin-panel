const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');

  const addtext = (req, res) => {
    const slogan = "slogan";
    const text = `Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. Lorem Ipsum has been the industry's 
    standard dummy text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries`;

    const commannd = "INSERT INTO presentationHome (slogan, texte) VALUES (?,?)";
    connection.query(commannd, [slogan, text], (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
         return res.status(200).json({
          message : "added"
         });
        }
    })
  }

  const getText = (req, res) => {
    let command = 'SELECT * FROM `presentationHome`'
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json =  JSON.parse(results_to_string);
       return res.status(200).json({
        data : result_to_json,
        message : "added"
       });
      }
  })
  }

  const updatePresentation = (req, res) => {
    const slogan = req.body.slogan;
    const text = req.body.text;

    let command = "UPDATE `presentationHome` SET `slogan`= ?, `texte`= ? ";
    connection.query(command, [slogan, text], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
       return res.status(200).json({
        message : "Contenu mis à jour avec succés !"
       });
      }
  })

  }

  module.exports = {
    addtext,
    updatePresentation,
    getText 
  }
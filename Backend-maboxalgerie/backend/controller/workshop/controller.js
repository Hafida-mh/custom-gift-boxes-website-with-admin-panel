const mysql = require('mysql');
require("dotenv").config();
// DATA BASE CONNEXION
const connection = require('../db');

const addworkshop = (req, res) => {
    const title = req.body.title;
    const id = req.body.id;
    const date = req.body.date;
    const place = req.body.place;
    const hour = req.body.hour;
    const description = req.body.description;
    const image = req.body.img;
   try {
     let command = `INSERT INTO workshop (title, id, date, hour, description, place, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
     let values = [title, id, date, hour, description, place, image];
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

 const uploadimg = (req, res) => {
    console.log("hii")
  }

  const displayWorkshop = (req, res) => {
    const command = "SELECT * FROM `workshop`"
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
  
  const updateWorkshop = (req, res) => {
    const data = req.body;
    let command = `UPDATE workshop SET title =?, date =? ,hour=?, place=?, photo=?, description=? WHERE id=?`;
    connection.query(command, [data.title, data.date, data.hour, data.place, data.img, data.description, data.id], (err, results, fields) => {
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

  const deleteWorkshop = (req, res) => {
    const workshop_id = req.body.id;
  
    let command = "DELETE FROM `workshop` WHERE `id` = ?"
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

  const registerworkshop = (req, res) => {
     const name = req.body.name;
     const id = req.body.id;
     const workshop = req.body.workshop;
     const email = req.body.email;
     const phone = req.body.phone;

try {
     let command = `INSERT INTO workshopregistration (id, workshop, name, email, phone) VALUES (?, ?, ?, ?, ?)`;
     let values = [id, workshop, name, email, phone];
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

  const getallregistration = (req, res) => {
    const command = "SELECT * FROM `workshopregistration`"
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

  const deleteCandidate = (req, res) => {
    const workshop_id = req.body.id;
  
    let command = "DELETE FROM `workshopregistration` WHERE `id` = ?"
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
    addworkshop,
    uploadimg,
    displayWorkshop,
    updateWorkshop,
    deleteWorkshop,
    registerworkshop,
    deleteCandidate,
    getallregistration
 }

const mysql = require('mysql');
require("dotenv").config();
const uniqid= require('uniqid');
const multer  = require('multer');
// DATA BASE CONNEXION
const connection = require('../db');
//const upload = multer({ dest: 'uploads/' })
/*
const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname)
  }
 })
 */

 const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname)
  }
 })


  const uploadImg = (req, res) => {
    const id = req.body.id;
    const file_name = req.body.file;
    const text_slide = req.body.text; 
    const title_slide = req.body.title;
    const show_button = req.body.showbutton;
    const linkButton = req.body.linkButton;

  let command = `INSERT INTO slides (id, filename, title, paragraph, button, linkbutton) VALUES (?,?,?,?,?,?)`;
  connection.query(command, [id, file_name, title_slide, text_slide, show_button, linkButton], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
     return res.status(200).json({
      data : results,
      message : "Slide ajouté avec succés !"
     });
    }

// res.send(req.file)
})
/*
  upload(req, res, (err) => {
     if(err) {
       res.sendStatus(500);
     }
     else {
      let command = `INSERT INTO slides (filename) VALUES (?)`;
      let values = req.file.originalname;
      let file = req.file;
      console.log(file)
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
     // console.log(req.file.fieldname)
     }
    // res.send(req.file)
   })
*/
}

const getSlides = (req, res) => {
  const command = "SELECT * FROM `slides`"
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

const deleteSlide = (req, res) => {
  const img_id = req.body.id;
  console.log(img_id);
  let command = "DELETE FROM `slides` WHERE `id` = ?"
  connection.query(command, [img_id], (err, results, fields) => {
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

const uploadimg = (req, res) => {
console.log("hii")
}
module.exports = {
  uploadImg,
  getSlides,
  deleteSlide,
  uploadimg
}

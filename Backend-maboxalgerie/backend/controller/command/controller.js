const mysql = require('mysql');
require("dotenv").config();
const uniqid= require('uniqid');
// DATA BASE CONNEXION
const connection = require('../db');

  const postCommand = (req, res) => {
    const i = 0;
   // const number = req.body.number;
    const id = req.body.id;
    const fullname = req.body.fullname;
    const adresse = req.body.adresse;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const list = req.body.list;
    const  detailproduct = req.body.detailproduct;
    const total = req.body.total;
    const wilaya = req.body.wilaya;
    const full_date =  new Date();
    const hour = `${full_date.getHours()} : ${full_date.getMinutes()}`;
    const date = `${full_date.getDate()} / ${full_date.getMonth()+1} / ${full_date.getFullYear()}`; 
    (date.toString().split(" ")).slice(0,4)
    console.log(list)

    const command_line = "INSERT INTO commande (id, fullname, adresse, email, telephone, list, hour, date, total, wilaya, details) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const values = [id, fullname, adresse, email, telephone, list, hour, date, total, wilaya, detailproduct]
    connection.query(command_line, values, (err, results, fields) => {
        if (err) {
            console.log(err)
        }
        else {
          updateqtes(req.body.list)
            return res.status(200).json({
                message : "commande enregistrée avec succés"
            })
        }
    })
    
  }

  const getAllCommands = (req, res) => {
      const command = "SELECT * FROM `commande` ORDER BY id ASC"
      connection.query(command, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
          let results_to_string = JSON.stringify(results);
          let result_to_json =  JSON.parse(results_to_string);
         return res.status(200).json({
            data : result_to_json,
            message : "imported successfully"
         });
        }
    })
  }
  const getCommands = (req, res) => {
    const command = "SELECT * FROM `commande`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json =  JSON.parse(results_to_string);
       return res.status(200).json({
          data : result_to_json,
          message : "imported successfully"
       });
      }
  })
}

  const confirmCommand = (req, res) => {
    const confirmed = req.body.confirmed;
    const id = req.body.id;
    const canceled = 0;
    let command = "UPDATE `commande` SET `confirmed`= ? AND `canceled`= ? WHERE id = ?";
    connection.query(command, [confirmed, canceled, id], (err, results, fields) => {
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

  const cancelCommand = (req, res) => {
    console.log(req.body.canceled)
    const canceled = 1;
    const id = req.body.id;
    const confirmed = 0
    let command = "UPDATE `commande` SET `canceled`= ? AND confirmed = ?  WHERE id = ?";
    connection.query(command, [canceled, confirmed, id], (err, results, fields) => {
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

  const deletCommand = (req, res) => {
    const commannd_id = req.body.id;
    let command = "DELETE FROM `commande` WHERE `id` = ?"
    connection.query(command, [commannd_id], (err, results, fields) => {
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

  const updateqtes = (list) => {
    const allitems = list;
  
    JSON.parse(allitems).map((elm)=> {
      let command = `UPDATE product SET quantity =?  WHERE id=?`;
      connection.query(command, [elm.totalstock - elm.qte, elm.id], (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
         console.log('done')
        }
      }) 
    })
  }

  const updateComment = (req,res) => {
const comment = req.body.comment;
const id = req.body.id;

let command = "UPDATE `commande` SET `details`= ? WHERE id = ?";
connection.query(command, [comment, id], (err, results, fields) => {
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

  const updateqteboxproducts = (list_product)=> {
    list_product.map((elm)=> {
  elm.map((productname) => {
  let command = "SELECT `quantity` FROM `product` WHERE name = ?";
  connection.query(command, [productname], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      console.log(results[0].quantity)
      let command_qte_product = `UPDATE product SET quantity =?  WHERE name = ?`;
      connection.query(command_qte_product, [Number(results[0].quantity) - 1,  productname], (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
         console.log('done')
        }
      }) 
    }
  }) 
})})}


  const postcommanndbox = (req,res)=> {
    const id = req.body.id;
    const boxinfo = req.body.boxinfo;
    const clientinfo = req.body.clientinfo;
    const total = req.body.total;

    const full_date =  new Date();
    const hour = `${full_date.getHours()} : ${full_date.getMinutes()}`;
    const date = `${full_date.getDate()} / ${full_date.getMonth()+1} / ${full_date.getFullYear()}`; 
    (date.toString().split(" ")).slice(0,4)
    const command_line = "INSERT INTO boxcommande (id, box, client, total, date) VALUES (?,?,?,?,?)"
    const values = [id, boxinfo, clientinfo, total, date]
    connection.query(command_line, values, (err, results, fields) => {
        if (err) {
            console.log(err)
        }
        else {
      //  updateqtes(JSON.stringify(JSON.parse(boxinfo).map((elm)=> elm.products)))
       updateqteboxproducts(JSON.parse(boxinfo).map((elm)=> elm.products))
            return res.status(200).json({
                message : "commande enregistrée avec succés"
            })
        }
    })
  }


  const getAllboxcommand = (req, res) => {
    const command = "SELECT * FROM `boxcommande`"
    connection.query(command, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      else {
        let results_to_string = JSON.stringify(results);
        let result_to_json =  JSON.parse(results_to_string);
       return res.status(200).json({
          data : result_to_json,
          message : "imported successfully"
       });
      }
  })

  }

  const deletCommandbox = (req, res) => {
    const commannd_id = req.body.id;
    let command = "DELETE FROM `boxcommande` WHERE `id` = ?"
    connection.query(command, [commannd_id], (err, results, fields) => {
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
    postCommand,
    getAllCommands,
    confirmCommand,
    deletCommand,
    getCommands,
    cancelCommand,
    updateqtes,
    updateComment,
    postcommanndbox,
    getAllboxcommand,
    deletCommandbox
  }

const mysql = require('mysql');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
// DATA BASE CONNEXION
const connection = require('../db');


const addCart = (req, res) => {
    const id = uuidv4();
    const full_date =  new Date();
    const date = `${full_date.getDate()} / ${full_date.getMonth()} / ${full_date.getFullYear()}`; 
    const tel = req.body.telephone;
    const email = req.body.email;
    const cart = req.body.cart;


    const command_select = "SELECT * FROM `cart` WHERE email = ? AND date = ?"
    const command_insert = `INSERT INTO cart (id, date, email, tel, cart) VALUES (?,?,?,?,?)`
    const command_update = "UPDATE `cart` SET cart = ?  WHERE  date = ? AND email = ?"
    connection.query(command_select, [email, date], (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        else {
            console.log(results)
            if(results.length != 0) {
                console.log("update")
                //UPDATE
                connection.query(command_update, [cart, date, email], (err, results, fields) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        return res.status(200).json({
                            message : "cart added successfully"
                        })
                    }
                })
            }
            else {
                //INSERT
                console.log("insert")
                connection.query( command_insert, [id, date, email, tel, cart], (err, results, fields) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        return res.status(200).json({
                            message : "cart added successfully"
                        })
                    }
                })
            }
        }
      });
}

const getCart = (req,res)=> {
        const command = "SELECT * FROM `cart`"
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

const deletCart = (req, res) => {
    const cart_id = req.body.id;
    let command = "DELETE FROM `cart` WHERE `id` = ?"
    connection.query(command, [cart_id], (err, results, fields) => {
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
    addCart,
    getCart,
    deletCart
  }
  
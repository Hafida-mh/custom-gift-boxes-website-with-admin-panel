const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require("dotenv").config();

const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
// DATA BASE CONNEXION
const connection = require('../db');
const transporter = nodemailer.createTransport({
  //host: "smtp.gmail.com",
  //port: 587,
  service: "gmail",
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'mechkour.hafida16@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

// register user
const connextion = async (req, res) => {
  //verify if the user already exists 
  const email = req.body.email;
  const password = req.body.password
 // const t = await bcrypt.hash("hafida16@gmail.com", 10)
 // console.log(t)
  try {
    const command_line = 'SELECT `pw`, `email_security` FROM `pw` WHERE 1';
    connection.query(command_line, (err, results, fields) => {
      if (err) {
        console.error(err.message);
      }
      else {
        if (bcrypt.compareSync(password, results[0].pw) === true && bcrypt.compareSync(email, results[0].email_security) === true) {
          //Gennerate secrete key
          const access_token = jwt.sign({ id: email }, process.env.SECRET_KEY);
          const refresh_token = jwt.sign({ id: email }, process.env.REFRESH_TOKEN);
          const commandLine = `UPDATE pw SET refreshToken = ?`;
          connection.query(commandLine, refresh_token, (err, results, fields) => {
            if (err) {
              return console.error(err.message);
            }
            else {
              return res.status(200).json({
                message: "Connexion réussie",
                token: access_token,
                refreshToken: refresh_token
              })
            }
          });
        }
        else {
          return res.json({
            message: "Mot de passe ou email incorrect"
          })
        }
      }
    });

  } catch (error) {
    console.log(error)
  }
}

const updatepw = async (req, res) => {
  const password = req.body.password;
  //console.log(password)
  const hashed_pw = await bcrypt.hash(password, Number(process.env.SALT));
  console.log(hashed_pw)
  const commandLine = `UPDATE pw SET pw=?`;
  connection.query(commandLine, hashed_pw, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      return res.status(200).json({
        message: "Mot de passe mis à jour avec succés !"
      });
    }
  });
}

const getPassword = (req, res) => {
  let reslt = null;
  const command_line = 'SELECT * FROM `pw` WHERE pw = ?';
  connection.query(command_line, (err, results, fields) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log(results[0].pw)
      return results[0].pw
    }
  });
}

const checkConnexion = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //console.log(password)
  const hashed_pw = await bcrypt.hash(password, Number(process.env.SALT));
  const command_line = 'SELECT `pw` FROM `pw` WHERE 1';
  connection.query(command_line, (err, results, fields) => {
    if (err) {
      console.error(err.message);
    }
    else {
      if (email === process.env.ADMIN && bcrypt.compareSync(password, results[0].pw) === true) {
        console.log("hellooooo");
      }
      else {
        console.log(results[0].pw)
      }
    }
  });
}

const checkRoute = (req, res) => {
  return res.status(200).json({
    message: "Connected"
  })
}

const forgotPassword = async (req, res) => {
  const secret_key = req.body.secretKey;
  const new_pw = uuidv4().slice(0, 5);
  const hashed_pw = await bcrypt.hash(new_pw, Number(process.env.SALT));

  const command = "SELECT * FROM `pw` WHERE secret_key = ?"
  connection.query(command, [secret_key], (err, results, fields) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log(results)
      if (results.length !== 0) {
        const commandLine = "UPDATE `pw`  SET pw = ?";
        connection.query(commandLine, [hashed_pw], (err, results, fields) => {
          if (err) {
            return console.error(err.message);
          }
          else {
            const info = transporter.sendMail({
              from: 'Princesse mechkour.hafida16@gmail.com', // sender address
              to: "mechkour.hafida16@gmail.com", // list of receivers
              subject: 'Récupération Mot de passe',
              text: `Votre mot de passe actuel est ${new_pw}`
            })
          }
        });
      }
      else {
        console.log("mot clé erroné")
      }
    }
  });
}

module.exports = {
  updatepw,
  checkConnexion,
  getPassword,
  connextion,
  checkRoute,
  forgotPassword
}

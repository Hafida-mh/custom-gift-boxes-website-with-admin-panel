const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { error } = require('qrcode-terminal');
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-mabox",
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Database ecommerceé Connected!");
});

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.json({
            message: "acces refusé"
        })
    }

    else {
        try {
            const command = 'SELECT * FROM `pw` WHERE refreshToken = ?'
            connection.query(command, token, (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results[0] && results[0].refreshToken === token) {
                        const decript = jwt.verify(token, process.env.REFRESH_TOKEN);
                        if (decript) {
                            next()
                        }
                        else {
                            return res.json({
                                message : "you need to connect"
                            })
                        }
                    }
                    else {
                        return res.json({
                            message : "you need to connect"
                        })
                       
                    }
                }
            })
            //   const descript = jwt.verify(token, process.env.SECRET_KEY);
            //   next()
        }
        catch {
            console.log(error)
        }
        //  return next()

    }
}

module.exports = verifyToken;
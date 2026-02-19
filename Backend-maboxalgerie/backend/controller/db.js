const mysql = require('mysql');

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

  module.exports = connection;

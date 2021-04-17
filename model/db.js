const Sequelize = require("sequelize");

const con = new Sequelize("unusualModern", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = con;

const Sequelize = require("sequelize");

const con = new Sequelize("unusualModern", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = con;

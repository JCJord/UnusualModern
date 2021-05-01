const Sequelize = require("sequelize");

const con = new Sequelize("unusualmodern", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = con;

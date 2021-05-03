const Sequelize = require("sequelize");

const con = new Sequelize(
  "heroku_f5904bf35411f4d",
  "ba8e11ca649cb9",
  "94ecb2a8",
  {
    host: "us-cdbr-east-03.cleardb.com",
    dialect: "mysql",
    timezone: "-03:00",
  }
);

module.exports = con;

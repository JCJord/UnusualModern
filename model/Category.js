const Sequelize = require("sequelize");
const con = require("./DB");
const Category = con.define("Categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;

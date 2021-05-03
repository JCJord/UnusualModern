const Sequelize = require("sequelize");
const con = require("./db");
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
Category.sync({ force: false });
module.exports = Category;

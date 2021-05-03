const Sequelize = require("sequelize");
const con = require("./db");
const Category = require("./Category");

const Article = con.define("article", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article);
Article.belongsTo(Category);
Article.sync({ force: false });
module.exports = Article;

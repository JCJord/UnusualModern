const Sequelize = require("sequelize");
const con = require("./DB");
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

module.exports = Article;

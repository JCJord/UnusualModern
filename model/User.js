const Sequelize = require("sequelize");
const db = require("./db");

const User = db.define("Users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    alloNull: false,
  },
});

User.sync({ force: false });

module.exports = User;

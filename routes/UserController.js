const express = require("express");
const router = express.Router();
const user = require("../model/User");
const category = require("../model/Category");
const bcrypt = require("bcryptjs");

router.get("/admin/user/create", (req, res) => {
  category.findAll().then((categories) => {
    res.render(__dirname + "/../views/admin/users/new", {
      categories: categories,
    });
  });
});

router.post("/user/create", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  user
    .findOne({
      where: {
        email: email,
      },
    })
    .then((users) => {
      if (users == undefined) {
        user
          .create({
            name: name,
            email: email,
            password: hash,
          })
          .then((req, res) => {
            res.redirect("/");
          })
          .catch((err) => {
            res.redirect("/");
          });
      } else {
        res.redirect("/admin/user/create");
      }
    });
});

router.get("/admin/user/list", (req, res) => {
  category.findAll().then((categories) => {
    user.findAll().then((users) => {
      res.render(__dirname + "/../views/admin/users/index", {
        users: users,
        categories: categories,
      });
    });
  });
});

router.get("/login", (req, res) => {
  res.render(__dirname + "/../views/admin/users/login");
});

router.post("/authenticate", (req, res) => {});

module.exports = router;

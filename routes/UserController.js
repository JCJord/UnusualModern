const express = require("express");
const router = express.Router();
const user = require("../model/User");
const category = require("../model/Category");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/user/create", adminAuth, (req, res) => {
  var logged = req.session.user;
  category.findAll().then((categories) => {
    res.render(__dirname + "/../views/admin/users/new", {
      categories: categories,
      logged: logged,
    });
  });
});

router.post("/user/create", adminAuth, (req, res) => {
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
          .then(() => {
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

router.get("/admin/user/list", adminAuth, (req, res) => {
  var logged = req.session.user;
  if (req.session.user == undefined) {
    res.redirect("/");
  }
  category.findAll().then((categories) => {
    user.findAll().then((users) => {
      res.render(__dirname + "/../views/admin/users/index", {
        users: users,
        categories: categories,
        logged: logged,
      });
    });
  });
});

router.get("/user/login", (req, res) => {
  var logged = req.session.user;
  category.findAll().then((categories) => {
    res.render(__dirname + "/../views/admin/users/login", {
      categories: categories,
      logged: logged,
    });
  });
});

router.post("/authenticate", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  user
    .findOne({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if (user != undefined) {
        var correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          req.session.user = {
            id: user.id,
            email: user.email,
          };
          res.redirect("/admin/articles");
        } else {
          res.redirect("/user/login");
        }
      } else {
        res.redirect("/user/login");
      }
    });
});

router.get("/user/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const article = require("../model/Article");
const slugify = require("slugify");
const category = require("../model/Category");

router.get("/admin/articles", (req, res) => {
  article
    .findAll({
      include: [{ model: category }],
    })
    .then((articles) => {
      res.render(__dirname + "/../views/admin/articles/index", {
        articles: articles,
      });
    });
});

router.get("/admin/article/new", (req, res) => {
  category.findAll().then((categories) => {
    res.render(__dirname + "/../views/admin/articles/new", {
      categories: categories,
    });
  });
});

router.post("/articles/save", (req, res) => {
  var title = req.body.title;
  var body = req.body.bdy;
  var CategoryId = req.body.category;
  article
    .create({
      title: title,
      slug: slugify(title),
      body: body,
      CategoryId: CategoryId,
    })
    .then(() => {
      res.redirect("/admin/articles");
      console.log("article saved");
    })
    .catch((err) => {
      res.redirect("/admin/article/new");
      console.log("could not save article" + err);
    });
});

router.post("/articles/delete", (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      article
        .destroy({
          where: {
            id: id,
          },
        })
        .then(() => {
          res.redirect("/admin/articles");
        });
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;

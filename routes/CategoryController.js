const express = require("express");
const router = express.Router();
const category = require("../model/Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  category.findAll().then((categories) => {
    res.render(__dirname + "/../views/admin/categories/new", {
      categories: categories,
    });
  });
});

router.post("/categories/save", (req, res) => {
  var title = req.body.title;
  if (title != undefined) {
    category
      .create({
        title: title,
        slug: slugify(title),
      })
      .then(() => {
        res.redirect("/admin/categories/");
      })
      .catch((err) => {
        console.log("error ocurred " + err);
      });
  } else {
    res.redirect("/admin/categories/new");
  }
});

// Rota para tabela de categorias
router.get("/admin/categories", (req, res) => {
  category.findAll().then((categories) => {
    res.render(__dirname + "/../views/admin/categories/index", {
      categories: categories,
    });
  });
});

router.post("/categories/delete", (req, res) => {
  var id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) {
      category
        .destroy({
          where: {
            id: id,
          },
        })
        .then(() => {
          res.redirect("/admin/categories");
        });
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  var id = req.params.id;

  category.findAll().then((categories) => {
    category.findByPk(id).then((category) => {
      if (id != undefined) {
        if (isNaN(id)) {
          res.redirect("/admin/categories");
        }
        res.render(__dirname + "/../views/admin/categories/edit", {
          category: category,
          categories: categories,
        });
      }
    });
  });
});

router.post("/categories/update", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  category
    .update(
      {
        title: title,
        slug: slugify(title),
      },
      { where: { id: id } }
    )
    .then(() => {
      res.redirect("/admin/categories");
    });
});

module.exports = router;

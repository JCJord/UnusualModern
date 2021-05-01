const express = require("express");
const router = express.Router();
const article = require("../model/Article");
const slugify = require("slugify");
const category = require("../model/Category");

// Rota de artigos
router.get("/admin/articles", (req, res) => {
  // Busca no banco todas colunas do banco
  article
    .findAll({
      include: [{ model: category }],
    })
    .then((articles) => {
      if (articles != undefined) {
        category.findAll({}).then((categories) => {
          res.render(__dirname + "/../views/admin/articles/index", {
            articles: articles,
            categories: categories,
          });
        });
      }
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

router.get("/admin/articles/edit/:id", (req, res) => {
  var id = req.params.id;

  category.findAll().then((categories) => {
    article.findByPk(id).then((article) => {
      if (id != undefined) {
        if (isNaN(id)) {
          res.redirect("/admin/articles");
        }
        res.render(__dirname + "/../views/admin/articles/edit", {
          categories: categories,
          article: article,
        });
      }
    });
  });
});

router.post("/articles/update", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.bdy;
  var ctg = req.body.category;
  article
    .update(
      {
        title: title,
        slug: slugify(title),
        body: body,
        CategoryId: ctg,
      },
      {
        where: {
          id: id,
        },
      }
    )
    .then(() => {
      res.redirect("/admin/articles");
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

router.get("/", (req, res) => {
  article
    .findAll({
      include: [{ model: category }],
      order: [["id", "DESC"]],
      limit: 4,
    })
    .then((articles) => {
      if (articles != undefined) {
        category.findAll({}).then((categories) => {
          res.render(__dirname + "/../views/index", {
            articles: articles,
            categories: categories,
          });
        });
      }
    });
});

router.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  article
    .findOne({
      where: {
        slug: slug,
      },
      include: [{ model: category }],
    })
    .then((articles) => {
      if (articles != undefined) {
        category.findAll().then((categories) => {
          res.render(__dirname + "/../views/admin/articles/article", {
            articles: articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
        console.log("failed");
      }
    });
});

router.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  category
    .findOne({
      where: {
        slug: slug,
      },
      include: [{ model: article }],
    })
    .then((Category) => {
      if (Category != undefined) {
        category
          .findAll()
          .then((categories) => {
            res.render(__dirname + "/../views/admin/categories/category.ejs", {
              articles: Category.articles,
              categories: categories,
            });
          })
          .catch((err) => {
            console.log("error" + err);
          });
      } else {
        res.redirect("/");
      }
    });
});

router.get("/page/:num", (req, res) => {
  var page = req.params.num;
  var offset = 0;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 4;
  }

  article
    .findAndCountAll({
      limit: 4,
      offset: offset,
      order: [["id", "DESC"]],
    })
    .then((articles) => {
      var next;
      if (offset + 4 >= articles.count) {
        next = false;
      } else {
        next = true;
      }
      var result = {
        next: next,
        articles: articles,
        page: parseInt(page),
      };

      category.findAll().then((categories) => {
        res.render(__dirname + "/../views/admin/articles/page", {
          categories: categories,
          result: result,
        });
      });
    });
});
module.exports = router;

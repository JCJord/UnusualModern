const express = require("express");
const app = express();
const db = require("./model/db");
const session = require("express-session");
const categoryController = require("./routes/CategoryController");
const articleController = require("./routes/ArticleController");
const userController = require("./routes/UserController");

app.use(
  session({
    saveUninitialized: false,
    resave: true,
    secret: "azKYUoKms₧↑♀←ƒ♪ö¿∞èìYìÑ╣êπ62ä65◘Ä98üï⌐☺9☺98oijfsaoiJSNAXG@%¨s!",
    cookie: {
      maxAge: 18000000,
    },
  })
);

db.authenticate()
  .then(() => {
    console.log("connected to mysql");
  })
  .catch((err) => {
    console.log("error occurred" + err);
  });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/", categoryController);
app.use("/", articleController);
app.use("/", userController);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log("connected to port 8082");
});

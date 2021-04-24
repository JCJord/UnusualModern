const express = require("express");
const app = express();
const db = require("./model/DB");
const routes = require("./routes/route");
const categoryController = require("./routes/CategoryController");
const articleController = require("./routes/ArticleController");

// Estabelecendo conexão com o banco

db.authenticate()
  .then(() => {
    console.log("connected to mysql");
  })
  .catch((err) => {
    console.log("error occurred" + err);
  });

// Configurando o template Engine

app.set("view engine", "ejs");

// Configurando o input Parser

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectando arquivos estáticos

app.use(express.static("public"));

// Conectando as rotas

app.use("/", routes);
app.use("/", categoryController);
app.use("/", articleController);

const PORT = 8082;
app.listen(PORT, () => {
  console.log("connected to port 8082");
});

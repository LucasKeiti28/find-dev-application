const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://lucas:simpls123@cluster0-ax3gp.mongodb.net/findevs?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Fazendo com que o express entenda o JSON
app.use(express.json());
// Fazendo com que a aplicacao tenha acesso as rotas
app.use(routes);

app.listen(3333);

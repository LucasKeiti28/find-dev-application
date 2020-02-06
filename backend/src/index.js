const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://lucas:simpls123@cluster0-ax3gp.mongodb.net/findevs?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Fazendo com que o front possa acessar o backend
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
// Fazendo com que o express entenda o JSON
app.use(express.json());
// Fazendo com que a aplicacao tenha acesso as rotas
app.use(routes);

server.listen(3333);

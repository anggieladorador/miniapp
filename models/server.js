require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { dbConection } = require("./../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.DB_conection();
    this.middlewares();
    this.routes();
  }
  async DB_conection() {
    await dbConection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    //static files
    this.app.use("/public", express.static(path.join(__dirname, "../public")));
  }

  routes() {
    //API USUARIO
    const userRoutes = this.app.use("/api/user", require("../routes/index"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`corriendo en el puerto  ${this.port}`);
    });
  }
}

module.exports = Server;

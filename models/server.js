require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")


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
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    //static files
    this.app.use("/public", express.static(path.join(__dirname, "../public")));
    //subir archivos al servidor
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
  }));
  }

  routes() {
    //API USUARIO
    const userRoutes = this.app.use("/api/user", require("../routes/index"));
    const appRoutes = this.app.use("/api/app", require("../routes/applications"))
    const authRoutes = this.app.use("/api/auth", require("../routes/auth"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`corriendo en el puerto  ${this.port}`);
    });
  }
}

module.exports = Server;

const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const applications = require("../controller/app");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");


router.post("/",[
  jwtValidator,
  check("name", "el campo nombre no puede estar vacio").not().isEmpty(),
  check("desc"," la descripción de la app es necesaria").not().isEmpty(),
  check("link", "el link de la app es necesaria").not().isEmpty(),
  fieldValidator
],applications.postApp)

module.exports=router
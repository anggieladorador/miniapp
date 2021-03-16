const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const applications = require("../controller/app");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { hasRole, hasPermission } = require("../middlewares/roleValidator");


router.post("/",[
  jwtValidator,
  check("name", "el campo nombre no puede estar vacio").not().isEmpty(),
  check("desc"," la descripción de la app es necesaria").not().isEmpty(),
  check("link", "el link de la app es necesaria").not().isEmpty(),
  fieldValidator
],applications.postApp)

router.get("/user",[
  jwtValidator
],applications.getAppsByUserId)

router.delete("/:id",[
  jwtValidator,
  hasPermission("eliminar aplicación", "USER_ROLE"),

],applications.deleteApp)

module.exports=router
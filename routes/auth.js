const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/fieldValidator");
const authController = require("../controller/auth")

const router = Router();

router.post("/login",[
  check("email","el correo debe ser válido").isEmail(),
  check("email","el correo no puede estar vacio").not().isEmpty(),
  check("pass","la contraseña no puede estar vacia").not().isEmpty(),
  fieldValidator
], authController.login )

module.exports=router
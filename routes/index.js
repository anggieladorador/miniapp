const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const userController = require("../controller/user");

const { fieldValidator } = require("../middlewares/fieldValidator");
const { isRegistered, isIdRegistered } = require("../helpers/userHelper");
//router.metodo("ruta",middleware,controlador)
router.get("/", userController.getUser);

router.post(
  "/",
  [
    check("name", "campo nombre no puede estar vacio").not().isEmpty(),
    check("email", "email no válido").isEmail(),
    check("email", "el email no puede estar vacio").not().isEmpty(),
    check("email").custom(isRegistered),
    check("pass", "la contraseña no puede estar vacía").not().isEmpty(),
    //check("rol", "no es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    fieldValidator,
  ],
  userController.postUser
);

router.put("/:id",[
  check("id", "no es un id válido").isMongoId(),
  check("id").custom(isIdRegistered),
  fieldValidator
] ,userController.updateUser);

router.delete("/:id",[
  check("id", "no es un id válido").isMongoId(),
  check("id").custom(isIdRegistered),
  fieldValidator
]
,userController.deleteUser);
module.exports = router;
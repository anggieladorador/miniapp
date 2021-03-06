const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const userController = require("../controller/user");
const  {jwtValidator} = require("../middlewares/jwtValidator")
const { fieldValidator, } = require("../middlewares/fieldValidator");
const { hasPermission, hasUserPermissionToDeleteUser} = require("../middlewares/roleValidator");
const { isRegistered, isIdRegistered } = require("../helpers/userHelper");
const { isNicknameRegistered} = require("../middlewares/userValidator")


//router.metodo("ruta",middleware,controlador)
router.get("/",
  [jwtValidator,
  hasPermission("ADMIN_ROLE", "obtener usuarios")]
, userController.getUser);

router.get("/data",
  jwtValidator
,userController.getById)

router.get("/:nickname",[isNicknameRegistered, fieldValidator], userController.getByNickname)

router.post(
  "/",
  [
    check("name", "campo nombre no puede estar vacio").not().isEmpty(),
    check("email", "email no válido").isEmail(),
    check("email", "el email no puede estar vacio").not().isEmpty(),
    check("email").custom(isRegistered),
    check("pass", "la contraseña no puede estar vacía").not().isEmpty(),
    fieldValidator,
  ],
  userController.postUser
);

router.put("/:id",[
  check("id", "no es un id válido").isMongoId(),
  check("id").custom(isIdRegistered),
  fieldValidator
] ,userController.updateUser);
//add hobbies to User
router.put("/hobbies/:id",[
  check("id", "no es un id válido").isMongoId(),
  check("id").custom(isIdRegistered),
  fieldValidator,
], userController.addHobbies);


router.delete("/:id",[
  jwtValidator,
  hasPermission( "Eliminar cuenta","ADMIN_ROLE","USER_ROLE"),
  hasUserPermissionToDeleteUser,
  check("id", "no es un id válido").isMongoId(),
  check("id").custom(isIdRegistered),
  fieldValidator
]
,userController.deleteUser);
module.exports = router;

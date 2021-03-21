const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const uploadController= require("../controller/upload");
const { fieldValidator } = require("../middlewares/fieldValidator");
const  {jwtValidator} = require("../middlewares/jwtValidator")

router.put("/:collection/:id",
[
  check("id", "no es un id válido").isMongoId(),
  jwtValidator,
  fieldValidator
]
,
 uploadController.uploadImage )

module.exports=router

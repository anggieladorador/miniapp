const { Router } = require("express");
const { check } = require("express-validator");
const uploadController= require("../controller/upload")

const router = Router();
const  {jwtValidator} = require("../middlewares/jwtValidator")

router.put("/:collection/:id", uploadController.uploadImage )

module.exports=router

const {response} = require("express")

const User = require("../models/user")
const bcrypt = require("bcrypt")
const {generateToken}=require("../helpers/jwt")

const login = async (req, res=response)=>{
  const {email, pass} = req.body
  try {
    const user = await User.findOne({email})
  
    //es usuario?
    if(!user){
      return res.status(400).json({
        msg:"email no registrado"
      })
    }
    //está activo?
    if(!user.isActive){
      return res.status(400).json({
        msg:"usuario no activo"
      })
    }

    //contraseña válida?
    const validPassword = bcrypt.compareSync(pass, user.pass)
    if(!validPassword){
      return res.status(400).json({
        msg:"contraseña equivocada"
      })
    }
    //generar JWT (JSON WEB TOKEN)
    const token = await generateToken(user.id)
    
    res.json({
      msg:"login ok",token
    })

    
  } catch (error) {
    res.status(500).json({
      msg:"no se ha encontrado email"
    })
    
  }

}

module.exports = {
  login
}
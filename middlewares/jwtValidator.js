const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const jwtValidator =  async (req= request, res= response, next)=>{
  const token = req.header("x-token")
  
  //no hay token
  if(!token){
    return res.status(400).json({
      msg:"token inexistente"
    })
  }
  try {
    const {uid}= jwt.verify(token ,process.env.PUBLICORSECRETKEY)

    const authenticatedUser = await User.findById(uid)
    
    if(!authenticatedUser.isActive){
      return res.status(500).json({
        msg:"Usuario no valido"
      })
    }

    req.user = authenticatedUser
    next()
    
  } catch (error) {
 
    res.status(401).json({
      msg:"token no válido"
    })
  }
}

module.exports={jwtValidator}
const { response, request } = require("express")
const jwt = require("jsonwebtoken")

const jwtValidator = (req= request, res= response, next)=>{
  const token = req.header("x-token")
  
  //no hay token
  if(!token){
    return res.status(400).json({
      msg:"TOKEN no válido"
    })
  }
  try {
    const {uid}= jwt.verify(token ,process.env.PUBLICORSECRETKEY)
    req.uid = uid
    console.log(uid)
    next()
    
  } catch (error) {
    console.log(error)
    res.status(401).json({

      msg:"token no válido"
    })
  }
}

module.exports={jwtValidator}
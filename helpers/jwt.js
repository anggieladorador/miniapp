const jwt = require("jsonwebtoken")

const generateToken = (uid)=> {
  return new Promise((resolve, reject)=>{
    const payload = {uid}
    jwt.sign(payload, process.env.PUBLICORSECRETKEY,{
      expiresIn:"2h"
    },(err, token)=>{
      if(err){
     
        reject("No se pudo generar el token")
      }else{
        resolve(token)
      }
      
    })


  })
}

module.exports = {generateToken}
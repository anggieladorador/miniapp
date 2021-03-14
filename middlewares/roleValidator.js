const app = require("../models/app")
const user = require("../models/user")

const roleValidator = (req, res, next )=>{
  if(!req.user){
    return res.status(500).json({
      msg:"No se está validando token previo"
    })
  }
  const {role} = req.user
  if(role !=  "ADMIN_ROLE"){
    return res.status(401).json({
      msg: "No tienes permiso para esto"
    })
  }
  next()
 
}

const hasRole = (...roles)=>{
  return (req, res, next)=>{
    const {role, id}= req.user
    
    if(roles.includes(role)){
      if( role == "USER_ROLE"  &&  id != req.params.id){
        return res.status(401).json({
          msg:"no tienes permiso para esto, no eres admin o no eres el usuario con esta cuenta"
        })
      }
    }
    next()
  }

}

const hasPermission = (role)=>{
  return  async (req, res, next)=>{
    const {id} = req.params
    const userId = req.user.id
    if(role === "USER_ROLE"){
      const hasApp = await app.findById(id)
      if(hasApp.user == userId){
        next()
      }
      else{
        return res.status(401).json({
          msg:"No tienes permiso para eliminar esta app"
        })
      }
    }
    else{
      return res.status(401).json({
        msg:"tienes que ser usuario de esta cuenta para poder eliminar la app"
      })
    }


  }
  
}
module.exports = {roleValidator, hasRole, hasPermission}
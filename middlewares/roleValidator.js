const app = require("../models/app")
const user = require("../models/user")


//Verifica si la persona tiene el rol que se solicita en la ruta
const hasPermission = ( action,...userRole)=>{
  return  async (req, res, next)=>{
    console.log(userRole)
    const{role } = req.user
    if(!req.user){
      return res.status(500).json({
        msg:"No se está validando token previo"
      })
    }
    let askedRole = roleName(userRole)
    if(userRole.includes(role)){
      next()
    }
    else{
      return res.status(401).json({
        msg:`tienes que ser ${askedRole}  para ${action}`
      })
    }
  }
  
}

const hasUserPermissionToDeleteUser  = async (req,res,next)=>{
  const{id,role}= req.user
  const userId = req.params.id

  if(role=="USER_ROLE"){
    if(id ===userId){
      next()
    }
    else{
      return res.status(401).json({
        msg:"debe ser el usuario para eliminar esta cuenta"
      })
    }
  }
}

const roleName = (name)=>{

  if(name.includes("USER_ROLE")){
    return "usuario"
  }
  if(name.includes("ADMIN_ROLE")){
    return "administrador"
  }
}
module.exports = {hasPermission, hasUserPermissionToDeleteUser}
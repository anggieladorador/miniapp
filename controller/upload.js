
const User = require("../models/user")
const App = require("../models/app");
const cloudinary = require("cloudinary").v2
cloudinary.config(process.env.CLOUDINARY_URL)

//const {uploadFile}= require("../helpers/uploadHelper");

const uploadImage = async (req, res)=>{
  const {collection, id} = req.params
  if(!req.files){
    return res.status(500).json({
      msg:"no hay archivos cargados"
    })
  }
  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:"usuario inexistente"
        })
      }
      
      break
    case "app":
      modelo = await App.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:"applicación inexistente"
        })
      }
     
      break;
    default:
      return res.json({msg:`la ruta ${collection} es inexistente`})
      break;
  }


  const {tempFilePath} = req.files.archivo
  
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

  if(modelo.img){
    const arrayName = modelo.img.split("/")
    const name = arrayName[arrayName.length -1]
    const [public_id] = name.split(".")

    await cloudinary.uploader.destroy(public_id)

  }
  modelo.img = secure_url
  await modelo.save()
  
  res.json({msg:"Actualizado!",modelo})
  


}
module.exports = {uploadImage}
const path = require("path")
const { v4: uuidv4 } = require('uuid');

const uploadFile = async (file, allowedExt = ["png", "jpg", "jpeg"] , directory='')=>{
  return new Promise((resolve,reject)=>{
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const {userImage} = file 
    const splittedFile = userImage.name.split(".")
    const ext = splittedFile[splittedFile.length -1]

    const imageName = `${uuidv4()}.${ext}`
  
    if(!allowedExt.includes(ext)){
      return reject(`${ext} no es una extensión válida, prueba:  ${allowedExt}`)
    }
    uploadPath = path.join(__dirname, "../uploads/",directory, imageName);

    // Use the mv() method to place the file somewhere on your server
    userImage.mv(uploadPath, function(err) {
      if (err){
        return reject(err)
      }
      resolve(uploadPath)
      
    });
  
  
    
  })

  
}

module.exports= {uploadFile}
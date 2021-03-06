const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("bd lista!");
  } catch (error) {
    throw new Error("error de conexión de base de datos");
  }
};

module.exports = {
  dbConection,
};

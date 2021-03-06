const { validationResult } = require("express-validator");

//validación de errores con express-validator
const fieldValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};



module.exports = {
  fieldValidator,

};

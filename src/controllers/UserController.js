//parte lógica para as requisições e respostas
const AppError = require("../utils/AppError");

class UserController {

  create(req, res) {
    const {name, email, password} = req.body;

    //validando o campo de name
    if(!name){
      throw new AppError("Insira o seu nome!");
    }

    res.status(201).json({name, email, password});
  };
};


module.exports = UserController;


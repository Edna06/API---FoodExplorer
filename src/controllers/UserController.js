//parte lógica para as requisições e respostas

//imports
const AppError = require("../utils/AppError");
const {hash} = require("bcryptjs");
//bd
const sqliteConnection = require("../database/sqlite");


class UserController {

  //criando uma nova conta
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM USERS WHERE email = ?", [email]);

    if(!name){
      throw new AppError("O campo 'Nome' é obrigatório! Preencha-o. ")
    }

    if (checkUserExists) {
      throw new AppError("Este email já está em uso!");
    }

    //criptografando senha antes de enviar para o db
    const hashPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword]
    );

    await database.close();

    return res.status(201).json();
  }
}


module.exports = UserController;


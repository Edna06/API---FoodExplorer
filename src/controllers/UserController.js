//parte lógica para as requisições e respostas

//imports
const AppError = require("../utils/AppError");
//bd
const sqliteConnection = require("../database/sqlite");

class UserController {

  //criando uma nova conta
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM USERS WHERE email = ?", [email]);

    if (checkUserExists) {
      throw new AppError("Este email já está em uso!");
    }

    await database.run(
      "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    await database.close();

    return res.status(201).json();
  }
}


module.exports = UserController;


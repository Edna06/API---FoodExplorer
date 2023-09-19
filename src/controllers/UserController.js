//imports
const AppError = require("../utils/AppError");
const {hash, compare} = require("bcryptjs");
//bd
const sqliteConnection = require("../database/sqlite");

class UserController{

  //criando uma nova conta
  async create(req, res) {
    const { name, email, password, isAdmin=false } = req.body;

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
      "INSERT INTO USERS (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
      [name, email, hashPassword, isAdmin]
    );

    await database.close();

    return res.status(201).json();
  }

  async update(req, res){
    const {name, email, password, old_password} = req.body;
    const user_id = req.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM USERS WHERE id = ?", [user_id]);

    if(!user){
      throw new AppError("O usuário não foi encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM USERS WHERE email = ?", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Insira um email diferente!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;


    if (password && !old_password){
      throw new AppError  ("Para redefinir a senha é necessário informar a antiga");
  }

  if (password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      //verificando se a senha inserida é a mesma cadastrada mo db
      if(checkOldPassword){
          if (password === old_password){
              throw new AppError ("A senha inserida é igual a anterior! Defina uma nova senha.");
          }

      } else if(!checkOldPassword){
          throw new AppError ("A senha antiga inserida está incorreta");
      }

      // Atualizando a senha adicionando criptografia
      user.password = await hash(password, 8);
  }

  // Atualizando os os dados
  await database.run(`
      UPDATE USERS SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name,
      user.email,
      user.password,
      user_id]
      );

      return res.status(200).json();
  }
}

module.exports = UserController;


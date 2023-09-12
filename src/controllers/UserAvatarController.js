//imports
const sqliteConnection = require("../database/sqlite");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/StorageAvatar");

class UserAvatarController {

  async update(req, res){
    const user_id = req.user.id;
    //buscando o nome do meu arquivo
    const avatarFilename = req.file.filename;

    const diskStorage = new DiskStorage();
    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM USERS WHERE id = (?)", [user_id]);

    if(!user){
      throw new AppError("Somente usuários autenticados podem mudar a foto do perfil!", 401)
    };

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar);
  }

  const filename = await diskStorage.saveFile(avatarFilename);
  user.avatar = filename;

  await database.run(`
  UPDATE users SET
  avatar = ?
  WHERE id = ?`,
  [
  user.avatar,
  user_id]
  )

   return res.json(user)
  }
};


module.exports = UserAvatarController;
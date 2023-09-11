//imports
const uploadConfig = require("../configs/upload")

//manipulação de arquivos e diretórios
const fs = require("fs");
const path = require("path");

class DiskStorage{

  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), //arquivo na posição inicial
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) //arquivo na posição final
    );

    return file;
  }

  async deleteFile(file){
    //o endereço do arquivo
    const filePath = path.resolve( uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath)
    } catch {
      return; //se caso algo dê errado, apenas encerra
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
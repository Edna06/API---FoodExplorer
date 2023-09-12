//imports
const fs = require ('fs');
const path = require ('path');

const uploadConfig = require('../configs/uploadAvatarUser');

class DiskStorageAvatar {
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),

            path.resolve(uploadConfig.UPLOADSAVATAR_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADSAVATAR_FOLDER, file);

        try{
            await fs.promises.stat(filePath);
        } catch{
            return;
        }

        await fs.promises.unlink(filePath);
    }
}


module.exports = DiskStorageAvatar;
//imports
const knex = require("../database/knex");

const DiskStorage = require("../providers/DiskStorage");

class DishImageController {
  async update (req, res){
    const {id} = req.params;

  const dish = await knex("dishes").where({id}).first();

  const diskStorage = new DiskStorage();
  const dishFilename = req.file.filename;

  if(dish.image){
    await diskStorage.deleteFile(dish.image);
  }

  const filename = await diskStorage.saveFile(dishFilename);
  dish.image = filename;

  await knex("dishes").update(dish).where({id});

  return res.json(dish);
  }

}

module.exports = DishImageController;
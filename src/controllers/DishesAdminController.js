//imports
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const DiskStorage = require("../providers/DiskStorage.js");

class DishesAdminController{

  async create(req, res){
    const {title, description, category, price, ingredients} = req.body;

    //verificação antes de cadastrar um novo prato
    const checkDishAlreadyExistInDatabase = await knex("dishes").where({title}).first();
    //caso o prato já esteja cadastrado, irá me retornar a menssagem de erro
    if(checkDishAlreadyExistInDatabase){
      throw new AppError("O prato inserido já está cadastrado no nosso sistema!")
    };

       // TESTE
        const dishFilename = req.file.filename;

        const diskStorage = new DiskStorage()

        const filename = await diskStorage.saveFile(dishFilename);

    //me retornará o id do prato, além de inserir na tabela dishes essas informações
    const dish_id = (await knex("dishes").insert({
      title,
      description,
      category,
      image: filename,
      price
    }))[0];

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.status(201).json()
  };

  async delete (req, res){
    const {id} = req.params;

    await knex("dishes").where({id}).delete();

    return res.status(200).json();
  };

  async update(req, res){
    const {title, description, category, image, price, ingredients} = req.body;
    const {id} = req.params;

    const dish = await knex("dishes").where({id}).first();

    dish.title= title ?? dish.title;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.image = image ?? dish.image;
    dish.price = price ?? dish.price;

    await knex("dishes").where({id}).update(dish);
    await knex("dishes").where({id}).update("updated_at", knex.fn.now());

    const hasOnlyOneIngredient = typeof(ingredients) === "string";

        let ingredientsInsert
        if (hasOnlyOneIngredient) {
          ingredientsInsert = {
            dish_id: dish.id,
            name: ingredients
          }
        } else if (ingredients.length > 1) {
          ingredientsInsert = ingredients.map(ingredient => {
            return {
              dish_id: dish.id,
              name : ingredient
            }
          })

          await knex("ingredients").where({ dish_id: id}).delete()
          await knex("ingredients").where({ dish_id: id}).insert(ingredientsInsert)
        }

    return res.status(202).json("Prato atualizado!")
  }
};

module.exports = DishesAdminController;
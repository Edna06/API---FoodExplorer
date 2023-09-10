
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesAdminController{

  async create(req, res){
    const {title, description, category, image, price, ingredients} = req.body;

    //verificação antes de cadastrar um novo prato
    const checkDishAlreadExistsInDatabase = await knex("dishes").where({title}).first();
    //caso o prato já esteja cadastrado, irá me retornar a menssagem de erro
    if(checkDishAlreadExistsInDatabase){
      throw new AppError("O prato inserido já está cadastrado no nosso sistema!")
    }

    //me retornará o id do prato, além de inserir na tabela dishes essas informações
    const dish_id = (await knex("dishes").insert({
      title,
      description,
      category,
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

    return res.status(202).json("Prato atualizado!")
  }
};

module.exports = DishesAdminController;

const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController{

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

  async show(req, res){
    const {id} = req.params;

    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");

    return res.status(200)
    .json({
      ...dish,
      ingredients
    })
  };

  async delete (req, res){
    const {id} = req.params;

    await knex("dishes").where({id}).delete();

    return res.status(200).json();
  };

  async index(req, res) {
    const { title, ingredients } = req.query;

    let dishes;

    if(ingredients){
        const filteredIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

        dishes = await knex("ingredients").select([
            "dishes.id",
            "dishes.title",
            "dishes.price",
            "dishes.category",
            "dishes.image",
            "dishes.price"
        ])
        .whereLike("dishes.title", `%${title}%`)
        .whereIn("name", filteredIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.title")

    } else{
    dishes = await knex("dishes")
    .whereLike("title", `%${title}%`)
}

const dishesIngredients = await knex("ingredients")
const dishesWithIngredients = dishes.map(dish => {
  const dishIngredient = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id);

  return {
    ...dish,
    ingredients: dishIngredient
  }
})

return res.status(200).json(dishesWithIngredients);
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

    return res.json("Prato atualizado!")
  }
};

module.exports = DishesController;
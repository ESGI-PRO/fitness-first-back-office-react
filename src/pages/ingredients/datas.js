import axios from "axios";

class Ingredients {
  ingredients = [];

  constructor() {
    this.init();
  }

  async init() {
    this.getingredients().then((item) => {
      this.ingredients.push(...item);
    });
  }

  async getingredients() {
    this.ingredients.length = 0;
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "nutrition/ingredients")
        .then((ingredients) => {
          var res = ingredients.data.data.nutrition;
          console.log(ingredients.data.data.nutrition);
          resolve(res);
        });
    });
  }

  async getingredientsByID(id) {
    this.ingredients.length = 0;
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "nutrition/ingredients" + id)
        .then((ingredients) => {
          var res = ingredients.data.data.nutrition;
          console.log(ingredients.data.data.nutrition);
          resolve(res);
        });
    });
  }

 
  async create(data) {
    return new Promise(function (resolve, reject) {
      axios
        .post(import.meta.env.VITE_URL_BACKEND + "nutrition/ingredients", data)
        .then((response) => {
          var res = response.data.data.nutrition;
          resolve(res);
        });
    });
  }

  async delete(id) {
    await axios
      .delete(import.meta.env.VITE_URL_BACKEND + "nutrition/ " + id)
      .then((ingredients) => {
        var res = ingredients.data.data.nutrition;
        return res;
      });

    this.getingredients();
  }
}

const ingredientsAPI = new Ingredients();
export default ingredientsAPI;

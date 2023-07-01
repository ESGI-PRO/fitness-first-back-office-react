import axios from "axios";

class Nutritions {
  nutritions = [];
  ingredients = [];

  constructor() {
    this.init();
  }

  async init() {
    this.getNutritions().then((item) => {
      this.nutritions.push(...item);
    });

    this.getIngredients().then((item) => {
      this.ingredients.push(...item);
    });
  }

  async getNutritions() {
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "nutrition")
        .then((nutritions) => {
          var res = nutritions.data.nutrition;
          console.log(nutritions.data.nutrition);
          resolve(res);
        });
    });
  }

  async getIngredients() {
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "nutrition/ingredients")
        .then((nutritions) => {
          var res = nutritions.data.data.nutrition;
          console.log("🚀 ~ file: datas.js:39 ~ Nutritions ~ .then ~ res:", res)
          console.log(nutritions.data.data.nutrition);
          resolve(res);
        });
    });
  }

  
}

const NutritionsAPI = new Nutritions();
export default NutritionsAPI;

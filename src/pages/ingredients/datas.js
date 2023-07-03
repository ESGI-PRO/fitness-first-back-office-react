import axios from "axios";

class Trainings {
  trainings = [];
  exercices = [];
  muscles = [];
  constructor() {
    this.init();
  }

  async init() {
    this.getTrainings().then((item) => {
      this.trainings.push(...item);
    });

    this.getExercices().then((item) => {
      this.exercices.push(...item);
    });

    this.getMuscles().then((item) => {
      console.log(
        "🚀 ~ file: datas.js:21 ~ Trainings ~ this.getMuscles ~ item:",
        item
      );
      this.muscles.push(...item);
    });
  }

  async getTrainings() {
    this.trainings.length = 0;
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "training")
        .then((trainings) => {
          var res = trainings.data.data.training;
          console.log(trainings.data.data.training);
          resolve(res);
        });
    });
  }

  async getMuscles() {
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "training/exercices/category")
        .then((responses) => {
          var res = responses.data.data.exercices.data;
          console.log("🚀 ~ file: datas.js:44 ~ Trainings ~ .then ~ res:", res);

          resolve(res);
        });
    });
  }

  async getExercices() {
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "training/exercices/")
        .then((exercices) => {
          var res = exercices.data.data.exercices.data;
          console.log(exercices);
          resolve(res);
        });
    });
  }

  async create(data) {
    return new Promise(function (resolve, reject) {
      axios
        .post(import.meta.env.VITE_URL_BACKEND + "training", data)
        .then((response) => {
          var res = response.data.data.training;
          resolve(res);
        });
    });
  }

  async delete(id) {
    await axios
      .delete(import.meta.env.VITE_URL_BACKEND + "training/ " + id)
      .then((trainings) => {
        var res = trainings.data.data.training;
        return res;
      });

    this.getTrainings();
  }
}

const TrainingsAPI = new Trainings();
export default TrainingsAPI;

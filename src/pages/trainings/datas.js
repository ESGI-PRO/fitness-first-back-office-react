import axios from "axios";

const headers = {
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

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
    console.log("entree dans training")
    this.trainings.length = 0;
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "training/exercises", { headers })
        .then((trainings) => {
          var res = trainings.data.data.exercises;
          console.log(trainings.data.data.exercises);
          resolve(res);
        });
    });
  }

  async getMuscles() {
    return new Promise(function (resolve, reject) {
      axios
        .get(import.meta.env.VITE_URL_BACKEND + "training/exercices/category", { headers })
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
        .get(import.meta.env.VITE_URL_BACKEND + "training/exercices/", { headers })
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
        .post(import.meta.env.VITE_URL_BACKEND + "training", data, { headers })
        .then((response) => {
          var res = response.data.data.training;
          resolve(res);
        });
    });
  }

  async delete(id) {
    await axios
      .delete(import.meta.env.VITE_URL_BACKEND + "training/ " + id, { headers })
      .then((trainings) => {
        var res = trainings.data.data.training;
        return res;
      });

    this.getTrainings();
  }
}

const TrainingsAPI = new Trainings();
export default TrainingsAPI;

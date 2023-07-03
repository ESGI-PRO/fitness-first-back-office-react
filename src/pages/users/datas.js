import axios from "axios";

class Users {
  users = [];

  constructor() {
    this.init();
  }

  async init() {
    this.getUsers().then((item) => {
      this.users.push(...item);
    });
  }

  async getUsers() {
    return new Promise(function (resolve, reject) {
      axios.get(import.meta.env.VITE_URL_BACKEND + "Users").then((Users) => {
        var res = Users.data.nutrition;
        console.log(Users.data.nutrition);
        resolve(res);
      });
    });
  }
}

const UsersAPI = new Users();
export default UsersAPI;

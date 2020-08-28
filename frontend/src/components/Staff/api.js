import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://s-ebanking-api.herokuapp.com/staffs",
  timeout: 10000,
});

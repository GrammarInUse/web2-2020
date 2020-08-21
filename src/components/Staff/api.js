import Axios from "axios";
const token = localStorage.getItem("token");
export const api = Axios.create({
  baseURL: "https://s-ebanking-api.herokuapp.com/staffs",

  headers: {
    "Content-Type": "application/json",
    authorization: `Bear ${token}`,
  },
});

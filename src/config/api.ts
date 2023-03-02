import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.18.37:5000/api",
  // baseURL: "https://cardery.herokuapp.com/api",
});
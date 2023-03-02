import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.35.253.7:5000/api",
  // baseURL: "https://cardery.herokuapp.com/api",
});
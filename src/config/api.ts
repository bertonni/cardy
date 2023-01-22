import axios from "axios";

export const api = axios.create({
  baseURL: "https://865b-128-201-199-205.sa.ngrok.io/api",
});
import { Cards } from "src/@types/types";
import { api } from "../config/api";

export const createCard = async (createCardPayload: Cards) => {
  const response = await api.post("/cards", createCardPayload);
  const message = response.data.message;

  return message;
};

export const getDecks = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.get("/decks", config);
  const decks = response.data;
  
  console.log(decks);
  return decks;
}

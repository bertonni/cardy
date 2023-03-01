import { Cards } from "src/@types/types";
import { api } from "../config/api";

export const createCard = async (createCardPayload: Cards, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.post("/cards", createCardPayload, config);
  const message = response.data.message;

  return message;
};

export const getDecks = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.get("/decks", config);
  const decks = response.data;
  
  return decks;
}

export const getCards = async (deckId: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.get(`/decks/${deckId}/cards`, config);
  const cards = response.data;
  
  return cards;
};

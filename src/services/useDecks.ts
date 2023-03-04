import { Cards, CreateDeckProps } from "src/@types/types";
import { api } from "../config/api";

export const createDeck = async (createDeckPayload: CreateDeckProps, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.post("/decks", createDeckPayload, config);
  const message = response.data.message;
  
  return message;
}

export const getDecks = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.get("/decks", config);
  const decks = response.data;
  
  return decks;
}

export const deleteDeck = async (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await api.delete(`/decks/${id}`, config);
  const message = response.data.message;

  return message;
}
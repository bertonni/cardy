import { Cards, CreateDeckProps } from "src/@types/types";
import { api } from "../config/api";

export const createCard = async (createCardPayload: Cards, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await api.post("/cards", createCardPayload, config);
  const message = response.data.message;

  return message;
};

export const getCards = async (deckId: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await api.get(`/decks/${deckId}/cards`, config);
  const cards = response.data;

  return cards;
};

export const getReviewCards = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await api.get(`/users/me/cards/review`, config);
  const reviewCards = response.data;

  return reviewCards;
};

export const sendReview = async (id: string, token: string, rate: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await api.patch(
    `/cards/${id}/rate`,
    { rating: rate },
    config
  );
  const message = response.data.message;

  return message;
};

export const deleteCard = async (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await api.delete(`/cards/${id}`, config);
  const message = response.data.message;
  
  return message;
};

export const getCardsReviewAvailability = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await api.get("/users/me/cards/review/availability", config);
  const availability = response.data;

  return availability;
}
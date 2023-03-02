import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from "react";
import { Cards, Decks, Message, ReviewCards } from "../@types/types";
import { getDecks, getReviewCards, getCards, createCard } from "../services/useDecks";
import { useAuth } from "./AuthContext";

export interface DecksContextDataProps {
  decks: Decks[];
  currentCards: Cards[];
  setCurrentCards: (cards: Cards[]) => void;
  updated: number;
  setUpdated: (value: number) => void;
  rated: number;
  setRated: (value: number) => void;
  isUserLoading: boolean;
  totalCards: number;
  reviewCards: ReviewCards[];
  message: Message;
  getCurrentCards: (deckId: string) => void;
  createFlashCard: (createCardPayLoad: Cards, token: string) => void;
}

interface DecksProviderProps {
  children: ReactNode;
}

export const DecksContext = createContext({} as DecksContextDataProps);

export const useDecks = (): DecksContextDataProps => {
  const context = useContext(DecksContext);

  return context;
};

export const DecksContextProvider = ({ children }: DecksProviderProps) => {
  const { user } = useAuth();
  const [decks, setDecks] = useState<Decks[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [updated, setUpdated] = useState<number>(0);
  const [rated, setRated] = useState<number>(0);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [currentCards, setCurrentCards] = useState<Cards[]>([]);
  const [reviewCards, setReviewCards] = useState<ReviewCards[]>([]);
  const [message, setMessage] = useState<Message>({} as Message);

  const getCurrentCards = async (deckId: string) => {
    const cards = await getCards(deckId, user.access_token);
    setCurrentCards(cards);
  };

  const createFlashCard = async (createCardPayload: Cards, token: string) => {
    try {
      const message = await createCard(createCardPayload, token);
      setMessage({ type: "success", message });
      setUpdated(updated + 1);
    } catch (error) {
      setMessage({ type: "error", message: "Some error ocurred" });
    }
  };

  const getAllDecks = async () => {
    try {
      const data: Decks[] = await getDecks(user.access_token);
      const initialValue = 0;
      const total = data.reduce((acc, curr) => acc + curr.cards_count, initialValue);
      setTotalCards(total);
      setDecks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllCardsReview = async () => {
    try {
      const cards: ReviewCards[] = await getReviewCards(user.access_token);
      console.log(cards);
      setReviewCards(cards);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.access_token) {
      getAllDecks();
      getAllCardsReview();
    }
    setIsUserLoading(false);
  }, [updated, rated, user.access_token]);  

  const memoedValues = useMemo(
    () => ({
      decks,
      isUserLoading,
      updated,
      setUpdated,
      rated,
      currentCards,
      setCurrentCards,
      setRated,
      getCurrentCards,
      totalCards,
      reviewCards,
      createFlashCard,
      message
    }),
    [decks, updated, totalCards, reviewCards, rated, currentCards]
  );

  return (
    <DecksContext.Provider value={memoedValues}>
      {!isUserLoading && children}
    </DecksContext.Provider>
  );
};

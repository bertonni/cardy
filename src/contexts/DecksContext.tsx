import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from "react";
import { Decks, ReviewCards } from "../@types/types";
import { getDecks, getReviewCards } from "../services/useDecks";
import { useAuth } from "./AuthContext";

export interface DecksContextDataProps {
  decks: Decks[];
  updated: number;
  setUpdated: (value: number) => void;
  rated: number;
  setRated: (value: number) => void;
  isUserLoading: boolean;
  totalCards: number;
  reviewCards: ReviewCards[];
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
  const [reviewCards, setReviewCards] = useState<ReviewCards[]>([]);

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
      setRated,
      totalCards,
      reviewCards,
    }),
    [decks, updated, totalCards, reviewCards, rated]
  );

  return (
    <DecksContext.Provider value={memoedValues}>
      {!isUserLoading && children}
    </DecksContext.Provider>
  );
};

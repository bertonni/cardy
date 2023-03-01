import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from "react";
import { Cards, Decks } from "../@types/types";
import { getDecks } from "../services/useDecks";
import { useAuth } from "./AuthContext";

export interface DecksContextDataProps {
  decks: Decks[];
  updated: number;
  setUpdated: (value: number) => void;
  isUserLoading: boolean;
  totalCards: number;
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
  const [totalCards, setTotalCards] = useState<number>(0);

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

  useEffect(() => {
    if (user.access_token) getAllDecks();
    setIsUserLoading(false);
  }, [updated, user.access_token]);
  

  const memoedValues = useMemo(
    () => ({
      decks,
      isUserLoading,
      updated,
      setUpdated,
      totalCards,
    }),
    [decks, updated, totalCards]
  );

  return (
    <DecksContext.Provider value={memoedValues}>
      {!isUserLoading && children}
    </DecksContext.Provider>
  );
};

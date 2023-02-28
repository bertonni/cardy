import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from "react";
import { Cards, Decks } from "../@types/types";
import { getDecks } from "../services/useDecks";
import { useAuth } from "./AuthContext";

export interface DecksContextDataProps {
  decks: Decks[];
  isUserLoading: boolean;
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
  const [isUserLoading, setIsUserLoading] = useState(false);

  const getAllDecks = async () => {
    try {
      const data = await getDecks(user.access_token);
      setDecks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.access_token) getAllDecks();
  }, []);
  

  const memoedValues = useMemo(
    () => ({
      decks,
      isUserLoading,
    }),
    [decks]
  );

  return (
    <DecksContext.Provider value={memoedValues}>
      {!isUserLoading && children}
    </DecksContext.Provider>
  );
};

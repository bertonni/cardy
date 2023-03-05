import {
  createCard,
  deleteCard,
  getCards,
  getCardsReviewAvailability,
  getReviewCards,
} from "@services/useCards";
import { getDecks } from "@services/useDecks";
import { getUserStats } from "@services/useUserService";
import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { useQuery } from "react-query";
import { Cards, Decks, Message, ReviewCards } from "../@types/types";
import { useAuth } from "./AuthContext";

interface UserStats {
  decks_count: number;
  cards_count: number;
  studied_cards_count: number;
  to_be_reviewed_count: number;
}

export interface DecksContextDataProps {
  rated: number;
  decks: Decks[];
  message: Message;
  updated: number;
  updateScreen: boolean;
  totalCards: number;
  userStats: UserStats;
  reviewCards: ReviewCards[];
  currentCards: Cards[];
  isUserLoading: boolean;
  nextReviewTime: number | null;
  setRated: (value: number) => void;
  setUpdated: (value: number) => void;
  setUpdateScreen: (value: boolean) => void;
  removeCard: (cardId: string, deckId: string) => void;
  getCurrentCards: (deckId: string) => void;
  setCurrentCards: (cards: Cards[]) => void;
  createFlashCard: (createCardPayLoad: Cards, token: string) => void;
}

interface DecksProviderProps {
  children: ReactNode;
}

interface CardReviewAvailability {
  status: number;
  message: string;
  review_available: boolean;
  next_review_in: number;
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
  const [updateScreen, setUpdateScreen] = useState<boolean>(false);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [userStats, setUserStats] = useState<UserStats>({} as UserStats);
  const [currentCards, setCurrentCards] = useState<Cards[]>([]);
  const [reviewCards, setReviewCards] = useState<ReviewCards[]>([]);
  const [message, setMessage] = useState<Message>({} as Message);
  const [nextReviewTime, setNextReviewTime] = useState<number | null>(null);

  const getCurrentCards = async (deckId: string) => {
    const cards = await getCards(deckId, user.access_token);
    setCurrentCards(cards);
  };

  const getCardsAvailability = async () => {
    if (user.access_token) {
      const data: CardReviewAvailability = await getCardsReviewAvailability(user.access_token);
      const now = new Date().valueOf() / 1000;
      if (!data.review_available) {
        const newTime = Math.ceil(data.next_review_in - now);
        setNextReviewTime(newTime);
      }
      else setNextReviewTime(null);
    }
  };

  const createFlashCard = async (createCardPayload: Cards, token: string) => {
    try {
      const message = await createCard(createCardPayload, token);
      setMessage({ type: "success", message });
      await getCardsAvailability();
      await getUserStatistics();
      await getCurrentCards(createCardPayload.deck_id);
    } catch (error) {
      setMessage({ type: "error", message: "Some error ocurred" });
    }
  };

  const removeCard = async (cardId: string, deckId: string) => {
    try {
      await deleteCard(cardId, user.access_token);
      await getCurrentCards(deckId);
      await getAllDecks();
      await getAllCardsReview();
      await getUserStatistics();
      setNextReviewTime(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDecks = async () => {
    try {
      const data: Decks[] = await getDecks(user.access_token);
      const initialValue = 0;
      const total = data.reduce(
        (acc, curr) => acc + curr.cards_count,
        initialValue
      );
      setTotalCards(total);
      setDecks(data);
    } catch (error) {
      throw error;
    }
  };

  const getAllCardsReview = async () => {
    if (user.access_token) {
      try {
        const cards: ReviewCards[] = await getReviewCards(user.access_token);
        setReviewCards(cards);
        return cards;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const getUserStatistics = async () => {
    const data = await getUserStats(user.access_token);
    setUserStats(data);
  };

  const cardsReviewQuery = useQuery(["getCardsReview"], getAllCardsReview, {
    refetchInterval: 1000 * (typeof nextReviewTime === "number" ? nextReviewTime : 5),
    onSuccess: (data) => {
      console.log("refetched");
      getCardsAvailability();
    },
    onError: (err) => {
      getCardsAvailability();
      console.log("error");
    },
  });

  useEffect(() => {
    setIsUserLoading(true);
    if (user.access_token) {
      getAllDecks();
      getUserStatistics();
      getCardsAvailability()
      cardsReviewQuery.refetch();
    }
    setIsUserLoading(false);
  }, [updated, rated, user.access_token]);

  const memoedValues = useMemo(
    () => ({
      decks,
      rated,
      message,
      updated,
      userStats,
      totalCards,
      reviewCards,
      currentCards,
      isUserLoading,
      nextReviewTime,
      updateScreen,
      setRated,
      removeCard,
      setUpdated,
      setCurrentCards,
      getCurrentCards,
      createFlashCard,
      setUpdateScreen
    }),
    [
      decks,
      updated,
      totalCards,
      reviewCards,
      rated,
      currentCards,
      userStats,
      nextReviewTime,
      updateScreen
    ]
  );

  return (
    <DecksContext.Provider value={memoedValues}>
      {!isUserLoading && children}
    </DecksContext.Provider>
  );
};

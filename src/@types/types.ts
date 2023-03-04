export interface CardProps {
  title: string;
  currentCards?: number;
  totalCards?: number;
}

export interface DeckProps {
  deckId: string;
  title: string;
  description: string;
  data: number;
  action?: () => void;
}

export interface Cards {
  deck_id: string;
  front_message: string;
  back_message: string;
  review_at?: string;
  tip: string;
  id?: string;
}

export interface Message {
  type: "error" | "success" | "warning" | "info";
  message: string;
}

export interface ReviewCards {
  deck_id: string;
  front_message: string;
  back_message: string;
  review_at: string;
  tip: string;
  id: string;
}

export interface Decks {
  id: string;
  name: string;
  description: string;
  cards_count: number;
}

export interface FlashCardProps {
  cardId: string;
  deckId: string;
  word: string;
  tip: string;
  tag: string;
  meaning?: string;
  data?: (data: FlashCardData) => void;
  control?: any;
}

export interface CreateDeckProps {
  name: string;
  description: string;
};

export interface FlashCardData {
  title: string;
  tip: string;
  tag: string;
  meaning: string;
}

export interface FlashCardBackProps {
  // data: (data: string) => void;
  control: any;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignInResponseData {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

export interface CreateCardDTO {
  title: string;
  tip: string;
  tag: string;
  meaning: string;
}
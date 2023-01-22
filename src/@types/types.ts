export interface CardProps {
  title: string;
  currentCards?: number;
  totalCards?: number;
}

export interface DeckProps {
  title: string;
  description: string;
  data: number[];
  action?: () => void;
}

export interface FlashCardProps {
  word: string;
  tip: string;
  tag: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
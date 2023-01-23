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
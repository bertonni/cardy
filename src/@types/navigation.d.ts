export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      main: undefined;
      home: undefined;
      landing: undefined;
      logout: undefined;
      signin: undefined;
      signup: undefined;
      viewCard: {
        headerTitle: string;
        cardsCount: string | number | number[];
        headerDescription: string;
      };
      deckList: undefined;
      createDeck: undefined;
      cardList: {
        title: string;
        currentCards?: number;
        totalCards?: number;
      };
      newCard: undefined;
      review: undefined;
      createCard: undefined;
      details: {
        id: string;
      };
    }
  }
}
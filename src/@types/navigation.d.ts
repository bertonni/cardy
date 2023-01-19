export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      main: undefined;
      landing: undefined;
      logout: undefined;
      signin: undefined;
      signup: undefined;
      deckList: undefined;
      cardList: {
        title: string;
        currentCards?: number;
        totalCards?: number;
      };
      newCard: undefined;
      createCard: undefined;
      details: {
        id: string;
      };
    }
  }
}
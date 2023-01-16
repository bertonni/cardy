import { createContext, ReactNode, useState, useEffect, useMemo, useContext } from "react";

interface UserProps {
  name: string;
  avatarUrl?: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: (value: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const useAuth = (): AuthContextDataProps => {
  const context = useContext(AuthContext);

  return context;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const signIn = async (name: string ) => {
    try {
      setIsUserLoading(true);
      setUser({ name: name, avatarUrl: "" });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signOut = () => {
    setUser({} as UserProps);
  };

  const memoedValues = useMemo(
    () => ({
      user,
      isUserLoading,
      signIn,
      signOut,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValues}>{children}</AuthContext.Provider>
  );
};

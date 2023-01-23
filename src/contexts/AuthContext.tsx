import { createContext, ReactNode, useState, useMemo, useContext } from "react";
import { login } from "../services/useAuth";
import { SignInDTO, UserProps } from "../@types/types";

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: (data: SignInDTO) => Promise<void>;
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

  const signIn = async (data: SignInDTO) => {
    try {
      const response = await login(data);
      setIsUserLoading(true);
      setUser(response);
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

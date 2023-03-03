import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { login } from "../services/useAuth";
import { SignInDTO, UserProps } from "../@types/types";
import * as SecureStore from "expo-secure-store";

const save = async (key: string, user: UserProps) => {
  await SecureStore.setItemAsync(key, JSON.stringify(user));
};

const getValuesFor = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);

  if (result) return result;
  return "";
};

const remove = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

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
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    getValuesFor("userData")
      .then((usr) => {
        if (usr) {
          const usrData = JSON.parse(usr);
          setUser(usrData);
        }
      })
      .catch((err) => console.log(err));
    setIsUserLoading(false);
  }, []);

  const signIn = async (data: SignInDTO) => {
    try {
      const user: UserProps = await login(data);
      setIsUserLoading(true);
      await save("userData", user);
      setUser(user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signOut = async () => {
    await remove("userData");
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
    <AuthContext.Provider value={memoedValues}>
      {!isUserLoading && children}
    </AuthContext.Provider>
  );
};

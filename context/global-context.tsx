import { User } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type GlobalContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
  setUser(user: User | null): void;
  setIsLoggedIn(value: boolean): void;
  setIsLoading(value: boolean): void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);

  return { globalContext };
};

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setUser,
        setIsLoggedIn,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

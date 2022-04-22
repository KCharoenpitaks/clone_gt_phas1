import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { useMoralis } from "react-moralis";

const AuthReducer = (state: any, action: { type: any }) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isAnonymous: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthContext = createContext<unknown>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { isAuthenticated } = useMoralis();

  const [data, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: false,
    isAnonymous: true,
  });

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ data, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

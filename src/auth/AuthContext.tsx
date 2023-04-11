import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';

import {
  AuthActionsType,
  AuthStateType,
  Types,
  AuthContextType,
} from './types';
import axios from '@/utils/axios';

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: AuthActionsType) => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case Types.SIGNIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.SIGNUP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signIn = async (username: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/signin', {
        username,
        password,
      });

      const { user, token } = res.data;

      localStorage.setItem('token', `Bearer ${token}`);

      dispatch({
        type: Types.SIGNIN,
        payload: {
          user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (name: string, username: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/signup', {
        name,
        username,
        password,
      });

      const { user, token } = res.data;

      localStorage.setItem('token', `Bearer ${token}`);

      dispatch({
        type: Types.SIGNUP,
        payload: {
          user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

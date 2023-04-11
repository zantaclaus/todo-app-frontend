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

  const initialize = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `${accessToken}`;

        const { data } = await axios.get('/api/user');

        const { user } = data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/signin', {
        username,
        password,
      });

      const { user, token } = res.data;

      localStorage.setItem('accessToken', `Bearer ${token}`);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

      localStorage.setItem('accessToken', `Bearer ${token}`);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

  const signOut = async () => {};

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

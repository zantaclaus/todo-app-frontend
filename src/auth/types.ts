export type AuthStateType = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: ProfileType;
};

export enum Types {
  INITIAL = 'INITIAL',
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
  LOGOUT = 'LOGOUT',
}

export type AuthActionsType =
  | {
      type: Types.INITIAL;
      payload: {
        isAuthenticated: boolean;
        user: ProfileType;
      };
    }
  | {
      type: Types.SIGNIN;
      payload: {
        user: ProfileType;
      };
    }
  | {
      type: Types.SIGNUP;
      payload: {
        user: ProfileType;
      };
    }
  | {
      type: Types.LOGOUT;
      payload: undefined;
    };

export type AuthContextType = AuthStateType & {
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (name: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export type ProfileType = null | {
  _id: string;
  name: string;
  username: string;
};

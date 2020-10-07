import React, { useReducer, createContext } from 'react';
import { IUser } from '../models';

// state
export interface AuthState {
    user: IUser | undefined;
}

const INITIAL_STATE: AuthState = {
    user: undefined,
}

// reducer
export enum AuthActionType {
    LOGGED_IN_USER = 'LOGGED_IN_USER',

}

interface AuthAction {
    type?: AuthActionType;
    payload?: IUser | undefined;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGGED_IN_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}

// create context
interface IAuthContext {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}


export const AuthContext = createContext<IAuthContext>({
    state: { user: undefined },
    dispatch: () => null,
});

// context provider
interface AuthProviderProps {
    children?: React.ReactNode;
}

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    const value = { state, dispatch };

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    );
}

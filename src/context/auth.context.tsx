import React, { useReducer, createContext, useEffect, useState } from 'react';
import { IUser } from '../models';
import { firebaseAuth } from '../utils/firebase';

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
    loading: boolean;
}


export const AuthContext = createContext<IAuthContext>({
    state: { user: undefined },
    dispatch: () => null,
    loading: true,
});

// context provider
interface AuthProviderProps {
    children?: React.ReactNode;
}

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = firebaseAuth.onAuthStateChanged(async user => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: AuthActionType.LOGGED_IN_USER,
                    payload: {
                        name: user.displayName || '',
                        email: user.email || '',
                        token: idTokenResult.token,
                    }
                });
                setLoading(false);
            } else {
                dispatch({
                    type: AuthActionType.LOGGED_IN_USER,
                    payload: undefined,
                });
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);

    const value: IAuthContext = { state, dispatch, loading };

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    );
}

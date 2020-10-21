import React, { useReducer, createContext, useEffect, useState } from 'react';
import { IUser } from '../models';
import { firebaseAuth } from '../utils/firebase';

// state
export interface AuthState {
    user: IUser | undefined;
    isAutoLogin: boolean;
}

const INITIAL_STATE: AuthState = {
    user: undefined,
    isAutoLogin: true,
}

// reducer
export enum AuthActionType {
    LOGGED_IN_USER = 'LOGGED_IN_USER',
    LOGOUT_USER = 'LOGOUT_USER',
    AUTO_LOGIN_ACTIVATE = 'AUTO_LOGIN_ACTIVATE',
    AUTO_LOGIN_DEACTIVATE = ' AUTO_LOGIN_DEACTIVATE',
}

interface LoginAction {
    type: AuthActionType.LOGGED_IN_USER;
    payload: IUser;
}

interface LogoutAction {
    type: AuthActionType.LOGOUT_USER;
}

interface AutoLoginActiveAction {
    type: AuthActionType.AUTO_LOGIN_ACTIVATE;
}

interface AutoLoginDeactiveAction {
    type: AuthActionType.AUTO_LOGIN_DEACTIVATE;
}

type AuthAction = LoginAction | LogoutAction | AutoLoginActiveAction | AutoLoginDeactiveAction;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGGED_IN_USER:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActionType.LOGOUT_USER:
            return {
                ...state,
                user: undefined,
            };
        case AuthActionType.AUTO_LOGIN_ACTIVATE:
            return {
                ...state,
                isAutoLogin: true,
            };
        case AuthActionType.AUTO_LOGIN_DEACTIVATE:
            return {
                ...state,
                isAutoLogin: false,
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
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


export const AuthContext = createContext<IAuthContext>({
    state: { user: undefined, isAutoLogin: true },
    dispatch: () => null,
    loading: true,
    setLoading: () => null,
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
                if (state.isAutoLogin) {
                    setLoading(true);
                    dispatch({
                        type: AuthActionType.LOGGED_IN_USER,
                        payload: {
                            name: user.displayName || '',
                            email: user.email || '',
                            token: idTokenResult.token,
                        }
                    });
                    console.log('logged in due to firebase auth state change');
                    setLoading(false);
                }
            } else {
                dispatch({
                    type: AuthActionType.LOGOUT_USER,
                });
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, [state.isAutoLogin]);

    const value: IAuthContext = { state, dispatch, loading, setLoading };

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    );
}

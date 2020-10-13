import { useReducer } from 'react';

export enum MODE {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export enum THEME {
    PURPLE = 'PURPLE',
}

export interface ThemeState {
    theme: THEME;
    mode: MODE;
}

export const INITIAL_STATE: ThemeState = {
    theme: THEME.PURPLE,
    mode: MODE.LIGHT,
}

export enum ThemeActionType {
    SET_THEME = 'SET_THEME',
    SET_MODE = 'SET_MODE',
}

interface SetThemeAction {
    type: ThemeActionType.SET_THEME;
    payload: THEME;
}

interface SetModeAction {
    type: ThemeActionType.SET_MODE;
    payload: MODE;
}

export type ThemeAction = SetThemeAction | SetModeAction;

const themeReducer = (state: ThemeState = INITIAL_STATE, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case ThemeActionType.SET_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        case ThemeActionType.SET_MODE:
            return {
                ...state,
                mode: action.payload,
            };
        default:
            return state;
    }
}

export const useThemeAndMode = () => {
    const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

    return { state, dispatch };
}
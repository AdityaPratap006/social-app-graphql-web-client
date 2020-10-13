import { MODE, THEME } from '../hooks/theme.hook';
export interface ITheme {
    primary?: string;
    primaryLight?: string;
    background?: string;
    primaryShadow?: string;
    text?: string;
    paper?: string;
    defaultBorderColor?: string;
}

interface ThemeColors {
    primary?: string;
    primaryLight?: string;
    primaryShadow?: string;
}

interface ModeColors {
    background?: string;
    text?: string;
    paper?: string;
    defaultBorderColor?: string;
}

export const lightMode: ModeColors = {
    background: '#fff',
    text: '#141d26',
    paper: '#fafafa',
    defaultBorderColor: `rgb(159,159,159, 0.5)`,
};

export const darkMode: ModeColors = {
    background: '#000',
    text: '#fff',
    paper: '#111',
    defaultBorderColor: `rgba(210, 210, 210, 0.2)`,
}

export const purpleTheme: ThemeColors = {
    primary: '#ab47bc',
    primaryLight: '#ba68c8',
    primaryShadow: 'rgb(171,71,188, 0.2)',
};

export const getPrimary = (theme: THEME): ThemeColors => {
    switch (theme) {
        case THEME.PURPLE:
            return purpleTheme;
        default:
            return purpleTheme;
    }
}


export const getTheme = (theme: THEME, mode: MODE): ITheme => {
    if (mode === MODE.DARK) {
        return {
            ...getPrimary(theme),
            ...darkMode,
        };
    } else if (mode === MODE.LIGHT) {
        return {
            ...getPrimary(theme),
            ...lightMode,
        };
    }

    return {
        ...getPrimary(theme),
        ...lightMode,
    };
}


// export const lightTheme: ITheme = {
//     primary: '#ab47bc',
//     primaryLight: '#ba68c8',
//     background: '#fff',
//     primaryShadow: 'rgb(171,71,188, 0.2)',
//     text: '#141d26',
//     paper: '#fafafa',
//     defaultBorderColor: `rgb(159,159,159, 0.5)`,
// };

// export const darkTheme: ITheme = {
//     primary: '#ab47bc',
//     primaryLight: '#ba68c8',
//     background: '#000',
//     primaryShadow: 'rgb(171,71,188, 0.2)',
//     text: '#fff',
//     paper: '#111',
//     defaultBorderColor: `rgba(210, 210, 210, 0.2)`,
// };
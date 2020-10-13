export interface ITheme {
    primary?: string;
    primaryLight?: string;
    background?: string;
    primaryShadow?: string;
    text?: string;
    paper?: string;
    defaultBorderColor?: string;
}

export const lightTheme: ITheme = {
    primary: '#ab47bc',
    primaryLight: '#ba68c8',
    background: '#fff',
    primaryShadow: 'rgb(171,71,188, 0.2)',
    text: '#141d26',
    paper: '#fafafa',
    defaultBorderColor: `rgb(159,159,159, 0.5)`,
};

export const darkTheme: ITheme = {
    primary: '#ab47bc',
    primaryLight: '#ba68c8',
    background: '#000',
    primaryShadow: 'rgb(171,71,188, 0.2)',
    text: '#fff',
    paper: '#111',
    defaultBorderColor: `rgba(210, 210, 210, 0.2)`,
};
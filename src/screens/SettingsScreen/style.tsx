import styled from 'styled-components';

export const Screen = styled.div`
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${props => props.theme.background};
`;

export const Grid = styled.div`
    width: 100%;
    display: grid;
    padding: 1rem;
    grid-template-areas: "backgroundSettings ."
    "themeSettings ."
    "themeSettings .";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
`;

export const BackgroundSettingsContainer = styled.div`
    grid-area: backgroundSettings;
`;

export const ThemeSettingsContainer = styled.div`
    grid-area: themeSettings;
`;
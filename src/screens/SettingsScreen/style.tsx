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
    position: sticky;

    @media (max-width: 640px) {
        padding-bottom: 5rem;
        z-index: 100;
    }
`;

export const Grid = styled.div`
    width: 100%;
    display: grid;
    padding: 1rem;
    grid-template-areas: "backgroundSettings ."
    "themeSettings ."
    "themeSettings .";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto, minmax(150px, 1fr));
    gap: 20px;
    align-items: center;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        grid-template-areas: "backgroundSettings"
        "themeSettings";
    }
`;

export const BackgroundSettingsContainer = styled.div`
    grid-area: backgroundSettings;
`;

export const ThemeSettingsContainer = styled.div`
    grid-area: themeSettings;
`;
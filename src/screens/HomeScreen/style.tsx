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

export const LoadingScreen = styled.div`
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PostGrid = styled.div`
    padding: 1rem;
    width: 35rem;
    max-width: 90vw;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto, minmax(20rem, 1fr));

    /* @media (max-width: 800px) {
        grid-template-columns: 1fr;
    } */
`;
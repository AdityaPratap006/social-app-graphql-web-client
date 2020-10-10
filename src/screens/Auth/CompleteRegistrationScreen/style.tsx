import styled, { css } from 'styled-components';
import BackgroundImage from '../../../assets/places-collage.jpg';

export const Screen = styled.div`
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(${BackgroundImage});
    background-position: center;
    background-size: contain;
    background-repeat: repeat;
    background-attachment: fixed;
`;

export const cardStyles = css`
    /* transform: translateY(-2rem); */
    width: 30rem;
    max-width: 90vw;
    background: rgba(255, 255, 255, 0.9);
    z-index: 5;
`;

export const Layer = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
`;
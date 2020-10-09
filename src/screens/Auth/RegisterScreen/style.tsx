import styled, { css } from 'styled-components';

export const Screen = styled.div`
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const cardStyles = css`
    transform: translateY(-2rem);
    width: 30rem;
    max-width: 90vw;
`;

export const buttonStyles = css`
    margin: 0 auto;
    background: yellow;
`;
import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface HeaderProps {
    addCSS?: FlattenSimpleInterpolation;
}

export const Header = styled.header<HeaderProps>`
    width: 25vw;
    height: 100vh;
    padding-left: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    border-right: 1px solid lightgray;
    /* box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.26); */
    z-index: 5;
    ${props => props.addCSS}

    @media (max-width: 800px) {
        width: 10vw;
        padding-left: 0.5rem;
    }
`;
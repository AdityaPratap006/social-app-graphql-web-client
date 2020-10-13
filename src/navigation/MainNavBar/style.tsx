import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface HeaderProps {
    addCSS?: FlattenSimpleInterpolation;
}

export const Header = styled.header<HeaderProps>`
    width: 25vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: ${props => props.theme.background};
    border-right: 0.1px solid ${props => props.theme.defaultBorderColor};
    /* box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.26); */
    z-index: 5;
    ${props => props.addCSS}

    @media (max-width: 800px) {
        width: 10vw;
        padding-left: 0.5rem;
    }
`;
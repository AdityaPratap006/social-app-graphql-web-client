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
    border-right: 1px solid ${props => props.theme.defaultBorderColor};
    /* box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.26); */
    z-index: 5;
    ${props => props.addCSS}
    overflow: hidden;

    @media (max-width: 1300px) {
        width: 10vw;
    }

    @media (max-width: 850px) {
        display: none;
    }
`;

export const MenuButton = styled.button`
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    
    .icon {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        color: gray;
    }

    @media (min-width: 1300px) {
        display: none;
    }
`;
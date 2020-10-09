import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface HeaderProps {
    addCSS?: FlattenSimpleInterpolation;
}

export const Header = styled.header<HeaderProps>`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    border-bottom: 1px solid lightgray;
    /* box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.26); */
    z-index: 5;
    ${props => props.addCSS}
`;
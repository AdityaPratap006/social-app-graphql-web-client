import { Link } from 'react-router-dom';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface StyledButtonProps {
    addCSS?: FlattenSimpleInterpolation;
}

const buttonStyles = css`
    font: inherit;
    padding: 0.75rem 1.5rem 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    background: ${props => props.theme.primary};
    color: white;
    cursor: pointer;
    margin-right: 1rem;
    text-decoration: none;
    display: inline-block;
    font-weight: 600;

    &:focus {
        outline: none;
    }

    &:hover {
        background: ${props => props.theme.primaryLight};

        &:disabled {
            background: #ccc;
            color: #979797;
            cursor: not-allowed;
        }
    }

    &:active {
        background: #ff4382;
        border-color: #ff4382;

        &:disabled {
            background: #ccc;
            color: #979797;
            cursor: not-allowed;
        }
    }

    &:disabled {
        background: #ccc;
        color: #979797;
        cursor: not-allowed;
    }

    &.button--inverse {
        background: transparent;
        color: ${props => props.theme.primary};
        border: 2px solid ${props => props.theme.primary};

        &:hover {
            color: white;
            background: #ff0055;
        }

        &:active {
            color: white;
            background: #ff0055;
        }
    }

    &.button--danger {
        background: #830000;

        &:hover {
            background: #f34343;
        }

        &:active {
            background: #f34343;
        }
    }

    &.button--small {
        font-size: 0.8rem;
    }

    &.button--big {
        font-size: 1.5rem;
    }
`;

export const StyledButton = styled.button<StyledButtonProps>`
    ${buttonStyles}
    ${props => props.addCSS}
`;

export const StyledALink = styled.a<StyledButtonProps>`
    ${buttonStyles}
    ${props => props.addCSS}
`;

export const StyledRouteLink = styled(Link) <StyledButtonProps>`
    ${buttonStyles}
    ${props => props.addCSS}
`;
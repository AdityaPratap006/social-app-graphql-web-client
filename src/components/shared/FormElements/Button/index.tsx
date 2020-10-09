import React from 'react';
import { StyledButton, StyledALink, StyledRouteLink } from './style';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    size?: string;
    inverse?: boolean;
    danger?: boolean;
    to?: string;
    exact?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
    const buttonSizeStyleClass = `button--${props.size || 'default'}`;

    if (props.href) {
        return (
            <StyledALink
                className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
                href={props.href}
            >
                {props.children}
            </StyledALink>
        );
    }
    if (props.to) {
        return (
            <StyledRouteLink
                to={props.to}
                className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
            >
                {props.children}
            </StyledRouteLink>
        );
    }
    return (
        <StyledButton
            className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </StyledButton>
    );
};

export default Button;

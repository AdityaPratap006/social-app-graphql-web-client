import styled, { css } from 'styled-components';

export const TopNavBarStyles = css`
    justify-content: space-between;
`;

export const CenterNav = styled.nav`
    display: block;

    @media (max-width: 800px) {
        display: none;
    }
`;

export const RightNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 1rem;
`;
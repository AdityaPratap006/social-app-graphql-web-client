import styled, { css } from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';
// import { ITheme } from '../../themes';

export const NavBody = styled.nav`
    /* border-top: 1px solid lightgray; */
    padding-left: 3rem;
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 1200px) {
        padding-left: 0.5rem;
    }
`;

export const NavFooter = styled.nav`
    padding-left: 3rem;
    width: 100%;
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    /* border-top: 1px solid lightgray; */

    @media (max-width: 1200px) {
        display: none;
    }
`;

export const AccountSectionContainer = styled.div`
    width: 100%;

    &:hover {
        cursor: pointer;
        
        .account-section {
            background-color: ${props => props.theme.primaryShadow};
        }
    }
`;

export const AccountSection = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: 0.2s ease;
    /* border: 2px solid  ${props => props.theme.primary}; */
    border-radius: 20px;
    padding: 0 0.5rem;
    margin: 0.5rem;

    .details {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 1rem;
        color: ${props => props.theme.text};
        font-weight: bold;
        
        .name {
            font-size: 1rem;
        }

        .email {
            font-size: 0.75rem;
        }
    }
`;

export const AccountIcon = styled(MdAccountCircle)`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    color: gray;
    cursor: pointer;
`;

export const SectionHeader = styled.h4`
    font-size: 1.2rem;
    margin: 0.5rem;
    padding: 0;
    color: ${props => props.theme.primary};
`;

export const LogoutButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LogoutButtonStyles = css`
    border-radius: 200px !important;
    transform: translateX(-1.5rem);
    margin-top: 1rem;
`;
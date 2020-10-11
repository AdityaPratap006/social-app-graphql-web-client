import styled, { css } from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';

export const NavBody = styled.nav`
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const NavFooter = styled.nav`
    width: 100%;
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const AccountSectionContainer = styled.div`
    width: 100%;

    &:hover {
        cursor: pointer;
        
        .account-section {
            padding-right: 1rem;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
`;

export const AccountSection = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: 0.2s ease;
    border-radius: 20px;

    .details {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 1rem;
        
        .name {
            font-size: 1.2rem;
        }

        .email {
            font-size: 0.9rem;
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
`;

export const LogoutButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LogoutButtonStyles = css`
    border-radius: 200px !important;
`;
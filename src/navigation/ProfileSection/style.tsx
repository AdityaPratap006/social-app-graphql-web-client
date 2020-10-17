import styled, { css } from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';

export const ProfileSectionContainer = styled.div`
    width: 100%;

    &.inside-side-drawer {
        border-bottom: 1px solid ${props => props.theme.defaultBorderColor};

        .account-section {
            /* flex-direction: column; */
            justify-content: flex-start;
        }
    }

    &.inside-main-navbar {

    }

    @media (max-width: 1300px) {
        &.inside-main-navbar {
            display: none;
        }
    }
`;

export const AccountSectionContainer = styled.div`
    width: 100%;

    &:hover {
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
    padding: 1rem;
    margin-left: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
    }

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
            margin-top: 0.5rem;
            font-size: 0.75rem;
        }

        @media (max-width: 1300px) {
            padding-left: 0;
            padding-top: 1rem;

            .name {
                font-size: 1.4rem;
            }

            .email {
                font-size: 1rem;
            }
        }

        @media (max-width: 640px) {

            .name {
                font-size: 1.1rem;
            }

            .email {
                font-size: 0.8rem;
            }
        }
    }
`;

export const AccountIcon = styled(MdAccountCircle)`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    color: gray;

    @media (max-width: 1300px) {
        /* margin: 1rem; */
        width: 7rem;
        height: 7rem; 
    }

    @media (max-width: 640px) {
        width: 5rem;
        height: 5rem;
    }
`;

export const LogoutButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    @media (min-width: 1300px) {
        margin: 0;
    }
`;

export const LogoutButtonStyles = css`
    border-radius: 200px !important;
    /* transform: translateX(-1.5rem); */
   

    @media (max-width: 1300px) {
        /* transform: translateX(0); */
    }
`;

export const ViewProfileButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    @media (min-width: 1300px) {
        margin: 1rem 0;
    }
`;
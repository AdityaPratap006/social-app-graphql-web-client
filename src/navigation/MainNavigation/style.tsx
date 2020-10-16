import styled from 'styled-components';

export const NavBody = styled.nav`
    /* border-top: 1px solid lightgray; */
    padding-left: 3rem;
    width: 100%;
    /* height: 50vh; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 1300px) {
        padding: 0;
        /* height: 80vh; */
    }
`;

export const NavFooter = styled.nav`
    padding-left: 1rem;
    width: 100%;
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    
    @media (min-width: 1300px) {
        border-top: 1px solid ${props => props.theme.defaultBorderColor};
    }

    @media (max-width: 1300px) {
        display: none;
    }

`;

export const SectionHeader = styled.h4`
    font-size: 1.2rem;
    margin: 0.5rem;
    padding: 0;
    color: ${props => props.theme.primary};
`;
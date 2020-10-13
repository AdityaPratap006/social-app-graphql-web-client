import styled from 'styled-components';

export const Container = styled.div`
    width: 25rem;
    max-width: 90vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const SwitchSelector = styled.button`
    outline: none;
    width: 7rem;
    height: 3rem;
    padding: 4px;
    border-radius: 200px;
    background-color: lightgray;
    border: 1px solid ${props => props.theme.defaultBorderColor};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    transition: 0.5s ease;

    &.on {
        background-color: transparent;
        padding-left: calc(7rem - 4px - 2.5rem);
    }

    &:hover {
        cursor: pointer;
    } 
`;

interface ThumbProps {
    isOn: boolean;
}

export const Thumb = styled.div<ThumbProps>`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.primary};
    background-color: ${props => props.isOn ? props.theme.primary : '#fff'};
`;

export const IndicatorText = styled.span`
    font-size: 2rem;
    font-weight: bold;
    width: 6rem;
    padding: 0.5rem 1rem;
    color: ${props => props.theme.primary};
`;
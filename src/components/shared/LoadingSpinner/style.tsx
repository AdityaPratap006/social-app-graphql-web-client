import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

export const DualRing = styled.div`
    display: inline-block;
    width: 64px;
    height: 64px;

    &:after {
        content: ' ';
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #aa02f8;
        border-color: #aa02f8 transparent #aa02f8 transparent;
        animation: ${rotateAnimation} 1.2s linear infinite;
    }
`;

export const RingContainer = styled.div`
    &.loading-spinner__overlay {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;
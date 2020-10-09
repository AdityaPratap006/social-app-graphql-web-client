import React from 'react';
import { RingContainer, DualRing } from './style';

interface LoadingSpinnerProps {
    asOverlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = props => {
    return (
        <RingContainer className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
            <DualRing />
        </RingContainer>
    );
};

export default LoadingSpinner;

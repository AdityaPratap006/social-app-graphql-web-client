import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Header } from './style';

interface TopNavBarProps {
    addCSS?: FlattenSimpleInterpolation;
}

const TopNavBar: React.FC<TopNavBarProps> = (props) => {
    return (
        <Header addCSS={props.addCSS}>
            {props.children}
        </Header>
    );
};

export default TopNavBar;

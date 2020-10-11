import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Header } from './style';

interface MainNavBarProps {
    addCSS?: FlattenSimpleInterpolation;
}

const MainNavBar: React.FC<MainNavBarProps> = (props) => {
    return (
        <Header addCSS={props.addCSS}>
            {props.children}
        </Header>
    );
};

export default MainNavBar;

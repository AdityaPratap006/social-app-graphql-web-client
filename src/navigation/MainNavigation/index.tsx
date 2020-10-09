import React from 'react';
import { CenterNav, TopNavBarStyles, RightNav } from './style';
import TopNavBar from '../TopNavBar';
import MainNavLinks from '../MainNavLinks';

const MainNavigation = () => {
    return (
        <React.Fragment>
            <TopNavBar addCSS={TopNavBarStyles}>
                <CenterNav>
                    <MainNavLinks />
                </CenterNav>
                <RightNav>
                    <h4>Account</h4>
                </RightNav>
            </TopNavBar>
        </React.Fragment>
    );
};

export default MainNavigation;

import React, { useContext } from 'react';
import { NavBody, NavFooter } from './style';
import MainNavBar from '../MainNavBar';
import MainNavLinks from '../MainNavLinks';
import BackDrop from '../../components/shared/BackDrop';
import SideDrawer from '../SideDrawer';
import { SideDrawerContext } from '../../context/sidedrawer.context';
import ProfileSection from '../ProfileSection';
import SideDrawerNavLinks from '../SideDrawerNavLinks';
import BottomAppBar from '../BottomAppBar';

const MainNavigation = () => {
    const sideDrawerCTX = useContext(SideDrawerContext);

    const closeDrawerHandler = () => {
        sideDrawerCTX.close();
    }

    return (
        <React.Fragment>
            <BackDrop show={sideDrawerCTX.isOpen} onClick={closeDrawerHandler} />
            <SideDrawer show={sideDrawerCTX.isOpen} onClose={closeDrawerHandler}>
                <ProfileSection insideSideDrawer />
                <SideDrawerNavLinks />
            </SideDrawer>
            <MainNavBar>
                <NavBody>
                    <MainNavLinks />
                </NavBody>
                <NavFooter>
                    <ProfileSection />
                </NavFooter>
            </MainNavBar>
            <BottomAppBar />
        </React.Fragment>
    );
};

export default MainNavigation;

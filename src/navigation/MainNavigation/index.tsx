import React, { useContext } from 'react';
import { NavBody, NavFooter, AccountSection, AccountIcon, LogoutButtonContainer, LogoutButtonStyles, AccountSectionContainer } from './style';
import MainNavBar from '../MainNavBar';
import MainNavLinks from '../MainNavLinks';
import Button from '../../components/shared/FormElements/Button';
import { AuthActionType, AuthContext } from '../../context/auth.context';
import { firebaseAuth } from '../../utils/firebase';
import BackDrop from '../../components/shared/BackDrop';
import SideDrawer from '../SideDrawer';
import { SideDrawerContext } from '../../context/sidedrawer.context';

const MainNavigation = () => {
    const auth = useContext(AuthContext);
    const sideDrawerCTX = useContext(SideDrawerContext);

    const closeDrawerHandler = () => {
        sideDrawerCTX.close();
    }

    const logoutHandler = () => {
        firebaseAuth.signOut();
        auth.dispatch({
            type: AuthActionType.LOGGED_IN_USER,
            payload: undefined,
        });
    }

    return (
        <React.Fragment>
            <BackDrop show={sideDrawerCTX.isOpen} onClick={closeDrawerHandler} />
            <SideDrawer show={sideDrawerCTX.isOpen} onClose={closeDrawerHandler}>
                <h5>Links go here!</h5>
            </SideDrawer>
            <MainNavBar>
                <NavBody>
                    <MainNavLinks />
                </NavBody>
                <NavFooter>
                    <AccountSectionContainer>
                        <AccountSection className="account-section">
                            <AccountIcon />
                            <div className="details">
                                <span className="name">{auth.state.user?.name}</span>
                                <span className="email">{auth.state.user?.email}</span>
                            </div>
                        </AccountSection>
                    </AccountSectionContainer>
                    <LogoutButtonContainer>
                        <Button onClick={logoutHandler} addCSS={LogoutButtonStyles}>
                            LOGOUT
                        </Button>
                    </LogoutButtonContainer>
                </NavFooter>
            </MainNavBar>
        </React.Fragment>
    );
};

export default MainNavigation;

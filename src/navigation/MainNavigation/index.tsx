import React, { useContext } from 'react';
import { NavBody, NavFooter, SectionHeader, AccountSection, AccountIcon, LogoutButtonContainer, LogoutButtonStyles, AccountSectionContainer } from './style';
import MainNavBar from '../MainNavBar';
import MainNavLinks from '../MainNavLinks';
import Button from '../../components/shared/FormElements/Button';
import { AuthActionType, AuthContext } from '../../context/auth.context';
import { firebaseAuth } from '../../utils/firebase';

const MainNavigation = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        firebaseAuth.signOut();
        auth.dispatch({
            type: AuthActionType.LOGGED_IN_USER,
            payload: undefined,
        });
    }

    return (
        <React.Fragment>
            <MainNavBar>
                <NavBody>
                    <MainNavLinks />
                </NavBody>
                <NavFooter>
                    <SectionHeader>MY PROFILE</SectionHeader>
                    <AccountSectionContainer>
                        <AccountSection className="account-section">
                            <AccountIcon />
                            <div className="details">
                                <span className="name">My Name</span>
                                <span className="email">My @email</span>
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

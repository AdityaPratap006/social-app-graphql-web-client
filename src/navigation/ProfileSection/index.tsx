import React, { useContext } from 'react';
import {
    ProfileSectionContainer,
    AccountSection,
    AccountIcon,
    LogoutButtonContainer,
    LogoutButtonStyles,
    AccountSectionContainer,
} from './style';
import { AuthContext, AuthActionType } from '../../context/auth.context';
import { firebaseAuth } from '../../utils/firebase';
import Button from '../../components/shared/FormElements/Button';

interface ProfileSectionProps {
    insideSideDrawer?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = (props) => {
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        firebaseAuth.signOut();
        auth.dispatch({
            type: AuthActionType.LOGGED_IN_USER,
            payload: undefined,
        });
    }

    return (
        <ProfileSectionContainer className={`${props.insideSideDrawer ? 'inside-side-drawer' : 'inside-main-navbar'}`}>
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
        </ProfileSectionContainer>
    );
}

export default ProfileSection;

import React from 'react';
import { BackgroundSettingsContainer, SettingsGrid, ThemeSettingsContainer, SettingsScreenContent } from './style';
import BackgroundSettings from '../../components/settings/BackgroundSettings';
import PrimaryColorSettings from '../../components/settings/PrimaryColorSettings';
import Screen from '../../components/shared/Screen';

const SettingsScreen = () => {
    return (
        <Screen
            title="settings"
            stackedUpScreen
            withGoBackButton
        >
            <SettingsScreenContent>
                <SettingsGrid>
                    <BackgroundSettingsContainer>
                        <BackgroundSettings />
                    </BackgroundSettingsContainer>
                    <ThemeSettingsContainer>
                        <PrimaryColorSettings />
                    </ThemeSettingsContainer>
                </SettingsGrid>
            </SettingsScreenContent>
        </Screen>
    );
};

export default SettingsScreen;

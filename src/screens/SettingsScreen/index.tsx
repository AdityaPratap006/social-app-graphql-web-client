import React from 'react';
import { BackgroundSettingsContainer, Grid, Screen, ThemeSettingsContainer } from './style';
import ScreenTitle from '../../components/shared/ScreenTitle';
import BackgroundSettings from '../../components/settings/BackgroundSettings';
import PrimaryColorSettings from '../../components/settings/PrimaryColorSettings';

const SettingsScreen = () => {
    return (
        <Screen>
            <ScreenTitle>
                SETTINGS
            </ScreenTitle>
            <Grid>
                <BackgroundSettingsContainer>
                    <BackgroundSettings />
                </BackgroundSettingsContainer>
                <ThemeSettingsContainer>
                    <PrimaryColorSettings />
                </ThemeSettingsContainer>
            </Grid>
        </Screen>
    );
};

export default SettingsScreen;

import React, { useContext, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache, PersistentStorage } from 'apollo3-cache-persist';
import localforage from 'localforage';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "styled-components";
import HomeScreen from "./screens/HomeScreen";
import { AuthContext } from './context/auth.context';
import MainNavigation from "./navigation/MainNavigation";
import { NavigationRoutes } from './navigation/navRoutes';
import RegisterScreen from "./screens/Auth/RegisterScreen";
import CompleteRegistrationScreen from "./screens/Auth/CompleteRegistrationScreen";
import LoginScreen from "./screens/Auth/Login";
import { getTheme } from './themes';
import SettingsScreen from './screens/SettingsScreen';
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { CustomThemeContext } from "./context/theme.context";
import { SideDrawerProvider } from './context/sidedrawer.context';
import ProfileScreen from "./screens/ProfileScreen";

const cache = new InMemoryCache();

const localDB = localforage.createInstance({
  storeName: localforage.INDEXEDDB,
});

const App: React.FC = () => {
  const [initializngPersist, setInitializePersist] = useState(true);
  const { state: authState, loading: authLoading } = useContext(AuthContext);
  const themeValue = useContext(CustomThemeContext);

  const themeState = themeValue.state;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  useEffect(() => {
    persistCache({
      cache,
      storage: localDB as PersistentStorage,
    }).then(() => {
      setInitializePersist(false);
    });
  }, []);

  if (initializngPersist || authLoading) {
    return (
      <LoadingSpinner asOverlay />
    );
  }

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: cache,
    headers: {
      authorization: authState.user?.token || '',
    },
  });

  const protectedRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.HOME}`} >
        <HomeScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.CHATS}`} >
        <h1>Chats</h1>
      </Route>
      <Route exact path={`${NavigationRoutes.SETTINGS}`}>
        <SettingsScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.PROFILE}`}>
        <ProfileScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.HOME}`} />
    </Switch>
  );

  const authRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.LOGIN}`}>
        <LoginScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.REGISTER}`}>
        <RegisterScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.COMPLETE_REGISTRATION}`}>
        <CompleteRegistrationScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.LOGIN}`} />
    </Switch>
  );

  return (
    <React.Fragment>
      <ToastContainer />
      <ApolloProvider client={client}>
        <ThemeProvider theme={currentTheme}>
          <SideDrawerProvider>
            {
              authState.user
                ? (
                  <React.Fragment>
                    <MainNavigation />
                    <main className='main-container'>
                      {protectedRoutes}
                    </main>
                  </React.Fragment>
                )
                : authRoutes
            }
          </SideDrawerProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;

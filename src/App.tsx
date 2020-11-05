import React, { useContext, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { toast, ToastContainer } from 'react-toastify';
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
import CreatePostScreen from "./screens/Posts/Create";
import { useNetworkStatus } from './hooks/networkStatus.hook';
import { getApolloClient } from './utils/apollo-client';
import { cloudMessaging } from './utils/firebase';

const App: React.FC = () => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const { state: authState, loading: authLoading } = useContext(AuthContext);
  const themeValue = useContext(CustomThemeContext);
  const isOnline = useNetworkStatus();

  const { state: themeState } = themeValue;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  useEffect(() => {
    if (authState.user) {
      let unsubscribeQueueLink: () => void;
      getApolloClient({
        authorization: authState.user?.token || '',
        fetchPolicy: isOnline ? "network-only" : "cache-only",
      }).then(({ client, unsubscribeQueue }) => {
        setApolloClient(client);
        unsubscribeQueueLink = unsubscribeQueue;
      }).catch((err) => {
        toast.error(`error setting up cache: ${err}`, { autoClose: false });
        console.log(err);
      });

      return () => {
        unsubscribeQueueLink();
      };
    }
  }, [authState.user, isOnline]);

  useEffect(() => {
    cloudMessaging
      .getToken({
        vapidKey: 'BC8TOrHSuBsDUij-uiQn1o4ULzgHRVMAhML7GcL8jFUK75FonutyRYiDPIemfqEGFd8gLCHh8wPtgGW_leM4eck',
      })
      .then((token) => {
        console.log(`[firabse messaging token]: ${token}`);
      })
      .catch(err => {
        console.log(`[firabse messaging error]: ${err}`);
      });

    cloudMessaging
      .onMessage(function (payload) {
        console.log(payload);
        toast(`${payload.notification.title}\n${payload.notification.body}`);
      });
  }, []);

  // useEffect(() => {
  //   if (!apolloClient) return;

  //   executeTrackedQueries(apolloClient);

  // }, [apolloClient]);

  if (!apolloClient) {
    return (
      <h1>Setting up cache</h1>
    )
  }

  if (authLoading) {
    return (
      <LoadingSpinner asOverlay />
    );
  }

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
      <Route exact path={`${NavigationRoutes.POST_CREATE}`}>
        <CreatePostScreen />
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
      <ApolloProvider client={apolloClient}>
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

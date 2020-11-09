import React, { useContext, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, from, HttpLink, InMemoryCache, split } from "@apollo/client";
import { persistCache, PersistentStorage } from 'apollo3-cache-persist';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import localforage from 'localforage';
import { toast } from 'react-toastify';
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
// import { getApolloClient } from './utils/apollo-client';
import { cloudMessaging } from './utils/firebase';

const cache = new InMemoryCache({ resultCaching: true });

const localDB = localforage.createInstance({
  storeName: localforage.INDEXEDDB,
});

const App: React.FC = () => {
  const [cacheInitializing, setCacheInitializing] = useState(true);
  const { state: authState, loading: authLoading } = useContext(AuthContext);
  const themeValue = useContext(CustomThemeContext);
  const isOnline = useNetworkStatus();

  const { state: themeState } = themeValue;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  useEffect(() => {
    const initCache = async () => {
      await persistCache({
        cache,
        storage: localDB as PersistentStorage,
      });

      setCacheInitializing(false);
    }

    initCache();
  }, []);

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

  if (cacheInitializing) {
    return (
      <h1>Setting up cache</h1>
    )
  }

  if (authLoading) {
    return (
      <LoadingSpinner asOverlay />
    );
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log(`[Network error]: ${networkError.message}`);
      // toast.error(`[Network error]: ${networkError.message}`);
    }
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    headers: {
      authorization: authState.user?.token,
    },
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WEBSOCKET_URL as string,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: authState.user?.token,
      },
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const link = from([
    errorLink,
    splitLink,
  ]);

  const apolloClient = new ApolloClient({
    link: link,
    connectToDevTools: true,
    cache: cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: isOnline ? "network-only" : "cache-only",
        errorPolicy: "all",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
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

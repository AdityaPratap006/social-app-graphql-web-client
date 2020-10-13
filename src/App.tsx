import React, { useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "styled-components";
import HomeScreen from "./screens/HomeScreen";
import { AuthContext } from './context/auth.context';
import MainNavigation from "./navigation/MainNavigation";
import { NavigationRoutes } from './navigation/navRoutes';
import RegisterScreen from "./screens/Auth/RegisterScreen";
import CompleteRegistrationScreen from "./screens/Auth/CompleteRegistrationScreen";
import LoginScreen from "./screens/Auth/Login";
import { lightTheme, darkTheme } from './themes';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const { state: authState } = useContext(AuthContext);

  const protectedRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.HOME}`} >
        <HomeScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.CHATS}`} >
        <h1>Chats</h1>
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
        <ThemeProvider theme={lightTheme}>
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
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;

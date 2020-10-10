import React, { useCallback, useContext, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import HomeScreen from "./screens/HomeScreen";
import { AuthActionType, AuthContext } from './context/auth.context';
import MainNavigation from "./navigation/MainNavigation";
import { NavigationRoutes } from './navigation/navRoutes';
import RegisterScreen from "./screens/Auth/RegisterScreen";
import CompleteRegistrationScreen from "./screens/Auth/CompleteRegistrationScreen";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const updateUserName = useCallback(() => {
    authDispatch({
      type: AuthActionType.LOGGED_IN_USER,
      payload: {
        id: '1',
        name: 'Aditya Pratap',
        email: 'any@email.xyz',
      }
    });
  }, [authDispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     updateUserName();
  //   }, 2000);
  // }, [updateUserName]);

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  const protectedRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.HOME}`} >
        <HomeScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.HOME}`} />
    </Switch>
  );

  const authRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.LOGIN}`}>
        <h1>LOGIN</h1>
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
        {
          authState.user
            ? (
              <React.Fragment>
                <MainNavigation />
                {protectedRoutes}
              </React.Fragment>
            )
            : authRoutes
        }
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;

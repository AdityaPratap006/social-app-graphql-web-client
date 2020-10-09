import React, { useCallback, useContext, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomeScreen from "./screens/HomeScreen";
import { AuthActionType, AuthContext } from './context/auth.context';
import MainNavigation from "./navigation/MainNavigation";

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

  useEffect(() => {
    setTimeout(() => {
      updateUserName();
    }, 2000);
  }, [updateUserName]);

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <MainNavigation />
        <HomeScreen />
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;

import React, { useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import HomeScreen from "./screens/HomeScreen";
import { AuthContext } from './context/auth.context';
import MainNavigation from "./navigation/MainNavigation";
import { NavigationRoutes } from './navigation/navRoutes';
import RegisterScreen from "./screens/Auth/RegisterScreen";
import CompleteRegistrationScreen from "./screens/Auth/CompleteRegistrationScreen";

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
                <main className='main-container'>
                  {protectedRoutes}
                </main>
              </React.Fragment>
            )
            : authRoutes
        }
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;

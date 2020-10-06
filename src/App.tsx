import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomeScreen from "./screens/HomeScreen";


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {


  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <HomeScreen />
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql, ApolloQueryResult } from "@apollo/client";
import { IPost } from "./models";
import PostCard from './components/post/PostCard';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result: ApolloQueryResult<{ allPosts: IPost[] }> = await client.query({
        query: gql`
          {
            allPosts {
              id,
              title,
              description
            }
          }
        `,
      });

      setPosts(result.data.allPosts);
    }

    fetchPosts();
  }, []);


  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const renderedPosts = posts.map(post => {
    return (
      <PostCard key={post.id} post={post} />
    );
  });

  return (
    <div>
      {renderedPosts}
    </div>
  );
};

export default App;

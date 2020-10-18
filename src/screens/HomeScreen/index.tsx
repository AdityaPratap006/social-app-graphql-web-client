import React from "react";
import { toast } from "react-toastify";
import { gql, useQuery } from "@apollo/client";
import { HomeScreenContent, PostGrid } from './style';
import { IPost } from "../../models";
import PostCard from '../../components/post/PostCard';
import Screen from '../../components/shared/Screen';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const GET_ALL_POSTS = gql`
    {
        allPosts {
            id,
            title,
            description
        }
    }
`;

const HomeScreen: React.FC = () => {
    const { data, error, loading } = useQuery<{ allPosts: IPost[] }>(GET_ALL_POSTS);

    if (error) {
        toast.error(`${error.name}: ${error.message}`);
    }

    const renderedPosts = data?.allPosts.map(post => {
        return (
            <PostCard key={post.id} post={post} />
        );
    });

    return (
        <Screen
            title="home"
        >
            <HomeScreenContent>
                {loading && <LoadingSpinner asOverlay />}
                {(!!error) && <h2>{error.name}: {error.message}</h2>}
                <PostGrid>
                    {renderedPosts}
                </PostGrid>
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;

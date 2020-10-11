import React from "react";
import { LoadingScreen, Screen, PostGrid } from './style';
import { gql, useQuery } from "@apollo/client";
import { IPost } from "../../models";
import PostCard from '../../components/post/PostCard';
import ScreenTitle from '../../components/shared/ScreenTitle';
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

    if (loading) {
        return (
            <LoadingScreen>
                <LoadingSpinner asOverlay />
            </LoadingScreen>
        );
    }

    const renderedPosts = data?.allPosts.map(post => {
        return (
            <PostCard key={post.id} post={post} />
        );
    });

    return (
        <Screen>
            <ScreenTitle>
                POSTS
            </ScreenTitle>
            {(!!error) && <h2>{error.name}: {error.message}</h2>}
            <PostGrid>
                {renderedPosts}
            </PostGrid>
        </Screen>
    );
};

export default HomeScreen;

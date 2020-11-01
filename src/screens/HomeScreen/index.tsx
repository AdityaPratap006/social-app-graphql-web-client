import React from "react";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { HomeScreenContent, PostGrid } from './style';
import { IPost } from "../../models";
import PostCard from '../../components/post/PostCard';
import Screen from '../../components/shared/Screen';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { GET_ALL_POSTS } from '../../graphql/queries';

const HomeScreen: React.FC = () => {
    const { data, error, loading } = useQuery<{ allPosts: IPost[] }>(GET_ALL_POSTS);

    if (error) {
        toast.error(`${error.name}: ${error.message}`);
    }

    const renderedPosts = data?.allPosts.map(post => {
        return (
            <PostCard key={post._id} post={post} />
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

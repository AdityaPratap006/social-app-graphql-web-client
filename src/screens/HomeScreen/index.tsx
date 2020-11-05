import React from "react";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { HomeScreenContent, PostGrid } from './style';
import { IPost } from "../../models";
import PostCard from '../../components/post/PostCard';
import Screen from '../../components/shared/Screen';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { GET_ALL_POSTS } from '../../graphql/queries';
import Button from "../../components/shared/FormElements/Button";
import { NavigationRoutes } from "../../navigation/navRoutes";

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
                <Button to={`${NavigationRoutes.POST_CREATE}`}>Share a Post</Button>
                {loading && <LoadingSpinner asOverlay />}
                <PostGrid>
                    {renderedPosts}
                </PostGrid>
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;

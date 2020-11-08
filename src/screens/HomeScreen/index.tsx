import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import _ from 'lodash';
import { HomeScreenContent, PostGrid } from './style';
import { IPost } from "../../models";
import PostCard from '../../components/post/PostCard';
import Screen from '../../components/shared/Screen';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { GET_ALL_POSTS } from '../../graphql/queries';
import Button from "../../components/shared/FormElements/Button";
import { NavigationRoutes } from "../../navigation/navRoutes";

interface IQueryResult {
    allPosts: IPost[];
    totalPosts: number;
}

const HomeScreen: React.FC = () => {
    const { data, error, loading, fetchMore } = useQuery<IQueryResult>(GET_ALL_POSTS, {
        variables: {
            input: {
                skip: 0,
            },
        },
    });

    const [reachedBottom, setReachedBottom] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const postGridRef = useRef<HTMLDivElement>(null);

    if (error) {
        toast.error(`${error.name}: ${error.message}`);
    }

    const scrollHandler = useCallback(() => {
        if (!postGridRef.current) {
            return;
        }

        if (!hasMore) {
            setReachedBottom(false);

            // setTimeout(() => {
            //     setReachedBottom(false);
            // }, 2000);

            return;
        }

        if (hasMore && postGridRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
            setReachedBottom(true);
        }
    }, [hasMore]);

    const scrollHandlerDebounced = useCallback(_.debounce(scrollHandler, 1000), []);

    useEffect(() => {

        window.addEventListener('scroll', scrollHandlerDebounced);

        return () => {
            window.removeEventListener('scroll', scrollHandlerDebounced);
        }
    }, [scrollHandlerDebounced]);

    const loadMorePosts = useCallback(async () => {
        console.log(`[existing]: ${data?.allPosts.length}`);

        if (!hasMore) {
            return;
        }

        await fetchMore({
            variables: {
                input: {
                    skip: data?.allPosts.length,
                },
            },
            updateQuery: (previous, { fetchMoreResult }) => {

                if (!fetchMoreResult) {
                    return previous;
                }

                let combined: IPost[] = [...previous.allPosts];

                fetchMoreResult.allPosts.forEach((post) => {
                    const alreadyExists = previous.allPosts.some(prevPost => prevPost._id === post._id);

                    if (alreadyExists) {
                        return;
                    }

                    combined.push(post);
                });

                const newData: IQueryResult = {
                    allPosts: combined,
                    totalPosts: fetchMoreResult.totalPosts,
                };

                if (newData.allPosts.length === fetchMoreResult.totalPosts) {
                    setHasMore(false);
                }

                return newData;
            },
        });

        setReachedBottom(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, hasMore]);

    useEffect(() => {
        if (reachedBottom && hasMore) {
            console.log('reached bottom: ', reachedBottom);
            loadMorePosts();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reachedBottom, hasMore]);

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
                <PostGrid ref={postGridRef}>
                    {renderedPosts}
                </PostGrid>
                {!loading && hasMore && <LoadingSpinner />}
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;

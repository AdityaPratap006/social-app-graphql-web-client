import { MutationUpdaterFn } from "@apollo/client";
import { IPost } from "../../models/post";
import { GET_ALL_POSTS } from "../queries";

const postCreate: MutationUpdaterFn<{ postCreate: IPost; }> = (cache, { data }) => {
    if (!data) {
        return;
    }
    const existingPostsQuery = cache.readQuery<{ allPosts: IPost[] }>({ query: GET_ALL_POSTS });

    let updatedPostsQuery: { allPosts: IPost[] };
    if (existingPostsQuery) {
        updatedPostsQuery = {
            allPosts: [...existingPostsQuery.allPosts, data.postCreate],
        };
    } else {
        updatedPostsQuery = {
            allPosts: [data.postCreate],
        };
    }

    cache.writeQuery({ query: GET_ALL_POSTS, data: updatedPostsQuery });
}

export default postCreate;
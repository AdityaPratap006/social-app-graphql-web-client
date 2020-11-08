import { gql } from '@apollo/client';
import { USER_INFO, POST_DATA } from './fragments';

export const PROFILE = gql`
    query {
        profile {
            ...userInfo
        }
    }

    ${USER_INFO}
`;

export const GET_ALL_POSTS = gql`
    query allPosts($input: AllPostsInput!) {
        totalPosts,
        allPosts(input:$input) {
           ...postData
        }
    }

    ${POST_DATA}
`;
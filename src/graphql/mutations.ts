import { gql } from '@apollo/client';
import { USER_INFO, POST_DATA } from './fragments';

export const USER_CREATE = gql`
    mutation userCreate($input: AuthTokenInput!) {
        userCreate(input: $input) {
            username,
            email
        }
    }
`;

export const USER_UPDATE = gql`
    mutation userUpdate($input: UserUpdateInput!) {
        userUpdate(input:$input) {
            ...userInfo
        }
    }

    ${USER_INFO}
`;

export const POST_CREATE = gql`
    mutation postCreate($input: PostCreateInput!) {
        postCreate(input: $input) {
            ...postData
        }
    }

    ${POST_DATA}
`;

export const SAVE_FCM_TOKEN = gql`
    mutation saveFcmToken($input: SaveFcmTokenInput!) {
        saveFcmToken(input: $input) {
            message
        }
    }
`;
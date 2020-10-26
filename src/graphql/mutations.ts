import { gql } from '@apollo/client';
import { USER_INFO } from './fragments';

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
import { gql } from '@apollo/client';

export const USER_INFO = gql`
    fragment userInfo on User {
        _id,
        username,
        name,
        about,
        email,
        images {
            url,
            public_id,
        },
        createdAt,
        updatedAt,
    }
`;

export const POST_DATA = gql`
    fragment postData on Post {
        _id,
        title,
        description,
        createdAt,
        updatedAt,
        createdBy {
            name,
            email,
            _id,
            images {
                url
            }
        }
    }
`;
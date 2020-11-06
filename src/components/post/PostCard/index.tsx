import React from 'react';
import { PostTitle, PostContent, PostHeader, PostAuthorDetails, PostAuthorImage, PostAuthorName, PostCreatedAt } from './style';
import { IPost } from '../../../models';
import Card from '../../shared/Card';
import { getLocalDateString } from '../../../utils/date';

interface PostCardProps {
    post: IPost;
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const { post } = props;
    const {
        title,
        description,
        createdAt,
        createdBy: author,
    } = post;

    const createdAtFormatted = getLocalDateString(createdAt);
    return (
        <Card>
            {author && (
                <PostHeader>
                    <PostAuthorImage src={author.images[0].url} />
                    <PostAuthorDetails>
                        <PostAuthorName>{author.name}</PostAuthorName>
                        <PostCreatedAt>{createdAtFormatted}</PostCreatedAt>
                    </PostAuthorDetails>
                </PostHeader>
            )}
            <PostTitle>{title}</PostTitle>
            <PostContent>{description}</PostContent>
        </Card>
    );
};

export default PostCard;

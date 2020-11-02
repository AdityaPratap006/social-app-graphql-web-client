import React from 'react';
import { PostTitle, PostContent, PostHeader, PostAuthorDetails, PostAuthorImage, PostAuthorName, PostAuthorEmail } from './style';
import { IPost } from '../../../models';
import Card from '../../shared/Card';

interface PostCardProps {
    post: IPost;
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const { post } = props;
    const {
        title,
        description,
        createdBy: author,
    } = post;

    return (
        <Card>
            <PostHeader>
                <PostAuthorImage src={author.images[0].url} />
                <PostAuthorDetails>
                    <PostAuthorName>{author.name}</PostAuthorName>
                    <PostAuthorEmail>{author.email}</PostAuthorEmail>
                </PostAuthorDetails>
            </PostHeader>
            <PostTitle>{title}</PostTitle>
            <PostContent>{description}</PostContent>
        </Card>
    );
};

export default PostCard;

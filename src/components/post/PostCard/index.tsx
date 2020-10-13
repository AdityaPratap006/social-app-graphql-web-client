import React from 'react';
import { PostTitle, PostContent, PostCardStyles } from './style';
import { IPost } from '../../../models';
import Card from '../../shared/Card';

interface PostCardProps {
    post: IPost;
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const { post } = props;
    return (
        <Card addCSS={PostCardStyles}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.description}</PostContent>
        </Card>
    );
};

export default PostCard;

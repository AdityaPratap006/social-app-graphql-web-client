import React from 'react';
import { IPost } from '../../../models';
import Card from '../../shared/Card';

interface PostCardProps {
    post: IPost;
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const { post } = props;
    return (
        <Card>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
        </Card>
    );
};

export default PostCard;

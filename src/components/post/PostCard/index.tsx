import React from 'react';
import { IPost } from '../../../models';
import Card from '../../shared/Card';

interface PostCardProps {
    post: IPost;
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const { post } = props;
    return (
        <Card style={styles}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
        </Card>
    );
};

const styles: React.CSSProperties = {
    width: "30rem",
    margin: "25px",
};

export default PostCard;

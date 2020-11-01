import { IUserProfile, ProfileImage } from './user';

interface AuthorProfileImage {
    url: ProfileImage['url'];
}

interface IPostAuthor {
    _id: IUserProfile['_id'];
    name: IUserProfile['name'];
    email: IUserProfile['email'];
    images: AuthorProfileImage[];
}

export interface IPost {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: IPostAuthor;
};
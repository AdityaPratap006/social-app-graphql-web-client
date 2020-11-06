import styled from 'styled-components';

export const PostHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const PostAuthorImage = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 0rem;
`;

export const PostAuthorDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 1rem;
`;

export const PostAuthorName = styled.h5`
    padding: 0;
    margin: 0.4rem 0;
    font-size: 1rem;
    color: ${props => props.theme.primary};
`;

export const PostCreatedAt = styled.small`
    padding: 0;
    margin: 0.2rem 0;
    font-family: 'roboto';
    font-size: 0.7rem;
    color: ${props => props.theme.text};
`;

export const PostTitle = styled.h4`
    padding: 0;
    margin: 1rem 0;
    font-size: 1.2rem;
    color: ${props => props.theme.primary};
`;

export const PostContent = styled.p`
    color: ${props => props.theme.text};
`;